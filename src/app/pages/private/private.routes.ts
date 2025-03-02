import { Routes } from '@angular/router';
import { UserRole } from '@core/auth/enums/roles.enum';
import { roleGuard } from '@core/guards/role.guard';
import { BalanceComponent } from './balance/balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { SettingsComponent } from './settings/settings.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'usuarios',
        loadChildren: () => import('./users/users.routes').then((r) => r.usersRoutes),
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
      {
        path: 'regras',
        component: RolesComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.EMPLOYEE] },
      },
      {
        path: 'saldo',
        component: BalanceComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.EMPLOYEE] },
      },
      {
        path: 'permissoes',
        component: PermissionsComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
      {
        path: 'configuracoes',
        component: SettingsComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
    ],
  },
];
