import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/public/auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/private/private.routes').then((r) => r.PRIVATE_ROUTES),
  },
  { path: '**', component: PageNotFoundComponent },
];
