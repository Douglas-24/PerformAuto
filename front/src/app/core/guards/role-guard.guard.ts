import {  CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const expectedRoles = route.data['roles'] as string[];
  return authService.getProfile().pipe(
    map(resp => {
      if (expectedRoles.includes(resp.user.rol)) {
        return true;
      } else { 
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/unauthorized']);
      return of(false);
    })
  );
};
