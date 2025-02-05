import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./core/layout/auth/auth.component').then(c => c.AuthComponent),
  },
];
