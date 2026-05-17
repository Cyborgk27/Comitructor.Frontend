import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UiService } from '../services/ui';
import { AccountService } from '../services/account.service';

/**
 * Guard para proteger rutas basadas en los roles del usuario.
 * @param allowedRoles Arreglo de strings con los nombres de los roles permitidos (ej: ['Administrator']).
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const uiService = inject(UiService);
  const accountService =inject(AccountService)

  const userRole = accountService.getUserRole();

  const expectedRoles: string[] = route.data['expectedRoles'];

  if (userRole && expectedRoles.includes(userRole)) {
    return true;
  }

  uiService.error(
    'No tienes los permisos necesarios para acceder a esta sección.',
    'Acceso Restringido'
  );

  return router.createUrlTree(['/dashboard']);
};
