import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./core/layout/auth/auth.component').then(c => c.AuthComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./domain/auth/auth.routes').then(r => r.AUTH_ROUTES),
      },
    ],
  },
];
