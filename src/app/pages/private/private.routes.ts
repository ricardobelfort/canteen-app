import { Routes } from '@angular/router';
import { UserRole } from '@core/auth/enums/roles.enum';
import { roleGuard } from '@core/guards/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN] },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.EMPLOYEE] },
      },
    ],
  },
];
