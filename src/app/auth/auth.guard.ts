import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedUserGuard: CanActivateFn = (_, __) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (authService.isLogged()) {
    return true;
  }

  router.navigate(['/auth']);
  return false;
};

export const isAnonUserGuard: CanActivateFn = (_, __) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if(authService.isLogged()) {
    router.navigate(['']);
    return false;
  }

  return true;
}
