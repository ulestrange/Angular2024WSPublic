import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from './authCustom.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  console.log('authGuard');
  console.log('current user is' + authService.currentUser$.value?.name);
  console.log('auth status is ' + authService.isAuthenticated$.value);

  if (authService.isAuthenticated$.value) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
