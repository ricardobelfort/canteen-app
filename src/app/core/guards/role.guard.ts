import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@pages/public/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRoles = authService.getUserRoles();
  const requiredRoles = route.data?.['roles'] as string[];

  if (userRoles.some(role => requiredRoles.includes(role))) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};