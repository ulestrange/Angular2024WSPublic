import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from './authCustom.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

};
