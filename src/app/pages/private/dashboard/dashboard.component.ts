import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserRole } from '@core/auth/enums/roles.enum';
import { AuthService } from '@pages/public/auth/auth.service';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, MenuModule, BadgeModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  items: MenuItem[] | undefined;
  user?: any;
  userRoles: string[] = [];
  UserRole = UserRole;

  constructor() {
    this.getUser();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Configurações',
            icon: 'pi pi-cog',
            route: '/dashboard/roles',
            visible: this.hasRole(UserRole.ADMIN),
          },
          {
            label: 'Mensagens',
            icon: 'pi pi-inbox',
            badge: '2',
          },
          {
            separator: true,
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }

  getUser() {
    this.user = this.authService.decodeToken();
    this.userRoles = this.authService.getUserRoles();

    console.log('Roles do usuário:', this.userRoles);
  }

  hasRole(role: UserRole): boolean {
    return this.userRoles.includes(role);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
