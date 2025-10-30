import {  CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
export const authGuardGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  if(!authService.isLogged()){
    router.navigate(['/auth'])
    return false
  }
  return true;
};
