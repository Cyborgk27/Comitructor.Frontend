import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UiService } from '../services/ui';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private uiService =inject(UiService);
  private router = inject(Router)

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    }

    this.uiService.error('Debe iniciar sesión para acceder a este recurso.', 'Acceso Denegado');
    return this.router.createUrlTree(['/auth']);
  }
}
