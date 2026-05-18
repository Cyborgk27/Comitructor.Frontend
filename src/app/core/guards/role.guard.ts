import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UiService } from '../services/ui';
import { AccountService } from '../services/account.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const uiService = inject(UiService);
  const accountService = inject(AccountService);

  const userRole = accountService.getUserRole();
  const expectedRoles: string[] = route.data['expectedRoles'] || [];

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  if (state.url.startsWith('/requests')) {
    return true;
  }

  if (userRole) {
    return router.createUrlTree(['/requests']);
  }

  return router.createUrlTree(['/auth']);
};
