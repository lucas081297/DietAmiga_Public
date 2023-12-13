import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token')
  const router = inject(Router)
  if (token){
    return true
  }
  else
  router.navigate([''])
  return false
};
