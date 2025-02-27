import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRole } from '@core/auth/enums/roles.enum';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser?: string;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any>;

  user$: Observable<any>;

  private http = inject(HttpClient);
  private jwtHelper = new JwtHelperService();

  constructor() {
    const decodedToken = this.decodeToken();
    this.userSubject = new BehaviorSubject<any>(decodedToken);
    this.user$ = this.userSubject.asObservable();
  }

  private readonly VALID_ROLES = Object.values(UserRole);

  login(user: { email: string; password: string }): Observable<unknown> {
    return this.http
      .post(`${this.apiUrl}/authentication/login`, user)
      .pipe(tap((res: any) => this.doLogin(user.email, res.token)));
  }

  private doLogin(email: string, token: any) {
    this.loggedUser = email;
    this.storeJwtToken(token);
    this.isAuthenticated.next(true);

    // ✅ Obtém as roles do usuário
    const userRoles = this.getUserRoles();

    // 🚨 Se o usuário não tiver roles, faz logout automaticamente e não exibe sucesso
    if (!userRoles.length) {
      this.logout(); // Remove o token e bloqueia o acesso
      throw new Error('Usuário sem permissões para acessar o sistema.');
    }
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
    this.userSubject.next(this.decodeToken());
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticated.next(false);
    this.userSubject.next(null);
  }

  // ✅ Decodifica o Token JWT
  decodeToken(): any {
    const token = localStorage.getItem(this.JWT_TOKEN);
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  // ✅ Verifica se o token ainda é válido
  hasValidToken(): boolean {
    const token = localStorage.getItem(this.JWT_TOKEN);
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  // ✅ Retorna os dados do usuário (exemplo: ID e e-mail)
  getUserData(): any {
    const decoded = this.decodeToken();
    return decoded ? { id: decoded.sub, email: decoded.email } : null;
  }

  // ✅ Obtém as roles do usuário autenticado
  getUserRoles(): string[] {
    const decoded = this.decodeToken();
    const userRoles = decoded?.roles || [];

    // ✅ Converte todas as roles para minúsculas para padronização
    return userRoles.map((role: UserRole) => role.toLowerCase());
  }

  // ✅ Verifica se o usuário tem a role necessária
  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getUserRoles();
    return requiredRoles.some((role) => userRoles.includes(role));
  }

  // ✅ Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return this.hasValidToken();
  }
}

