import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '@core/interfaces/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token'); // Pegando o token do localStorage (ou outra forma de autenticação)

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Adicionando o token JWT no cabeçalho
      'Content-Type': 'application/json'
    });

    return this.http.get<User[]>(this.apiUrl, { headers });
  }
}
