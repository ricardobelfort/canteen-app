import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserRole } from '@core/auth/enums/roles.enum';
import { DrawerComponent } from '@core/components/drawer/drawer.component';
import { AppMenuItem } from '@core/interfaces/app-menu-item.ts';
import { AuthService } from '@pages/public/auth/auth.service';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, MenuModule, BadgeModule, RouterLink, ButtonModule, DrawerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  user?: any;
  userRoles: string[] = [];
  UserRole = UserRole;
  menuItems: AppMenuItem[] = [];
  profileItems: AppMenuItem[] = [];
  isDrawerOpen = signal(false);
  isReportsOpen = signal(false);

  ngOnInit() {
    this.getUser();
    this.profileItems = [
      {
        label: 'Perfil',
        items: [
          {
            label: 'Meus Dados',
            icon: 'pi pi-user-edit',
            routerLink: '/dashboard/profile',
            visible: this.hasRole(UserRole.ADMIN),
          },
          {
            label: 'Configurações',
            icon: 'pi pi-cog',
            routerLink: '/dashboard/roles',
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
        roles: [],
      },
    ];
  }

  buildMenu() {
    if (!this.userRoles.length) return;

    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dashboard',
        roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
      },
      {
        label: 'Saldo e Extrato',
        icon: 'pi pi-list-check',
        routerLink: '/bookmarks',
        roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
      },
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        roles: [UserRole.ADMIN],
        items: [
          {
            label: 'Lista de Usuários',
            icon: 'pi pi-list',
            routerLink: '/dashboard/users/list',
          },
          {
            label: 'Criar Usuário',
            icon: 'pi pi-user-plus',
            routerLink: '/dashboard/users/create',
          },
        ],
      },
      {
        label: 'Relatórios',
        icon: 'pi pi-chart-line',
        roles: [UserRole.ADMIN],
        items: [
          {
            label: 'Relatório de Vendas',
            icon: 'pi pi-chart-bar',
            routerLink: '/reports/sales',
          },
          {
            label: 'Relatório de Acessos',
            icon: 'pi pi-eye',
            routerLink: '/reports/access',
          },
        ],
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        roles: [UserRole.ADMIN],
        items: [
          {
            label: 'Ajustes do Sistema',
            icon: 'pi pi-sliders-h',
            routerLink: '/dashboard/settings',
          },
          {
            label: 'Permissões',
            icon: 'pi pi-lock',
            routerLink: '/dashboard/permissions',
          },
        ],
      },
      {
        label: 'Meu Perfil',
        icon: 'pi pi-user',
        routerLink: '/dashboard/profile',
        roles: [UserRole.EMPLOYEE],
      },
    ];

    // 🔥 Filtra os menus com base na role do usuário
    this.menuItems = this.menuItems.filter(
      (item) => item.roles?.some((role) => this.hasRole(role)) || !item.roles // Se não houver roles, mantém o item
    );
  }

  toggleDrawer() {
    this.isDrawerOpen.set(!this.isDrawerOpen());
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }

  getUser() {
    this.user = this.authService.decodeToken();
    this.userRoles = this.authService.getUserRoles();

    console.log('Roles do usuário:', this.userRoles);

    if (this.userRoles.length > 0) {
      this.buildMenu();
    }
  }

  hasRole(role: UserRole): boolean {
    console.log('Verificando role:', role, 'Lista de roles do usuário:', this.userRoles);
    return this.userRoles.includes(role);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
