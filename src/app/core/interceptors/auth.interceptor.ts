import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UiService } from '../services/ui';
import { AccountService } from '../services/account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private uiService =inject(UiService);
  private router = inject(Router)
  private accountService = inject(AccountService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.accountService.getToken();;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.uiService.error('Su sesión ha expirado. Por favor, ingrese de nuevo.', 'Sesión Inválida');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
