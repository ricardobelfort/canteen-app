import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
