import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

import { AUTH_KEYS } from '../constants/auth.constants';
import { AuthService } from '../api/api/auth.service';
import { LoginRequest, LoginResponse } from '../api';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly apiAuth = inject(AuthService);
  private readonly router = inject(Router);

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  public authStatus$ = this.authStatusSubject.asObservable();

  /**
   * Realiza el login usando el servicio generado y persiste la sesión.
   */
  login(credentials: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.apiAuth.apiAuthLoginPost(credentials).pipe(
      tap(response => {
        if (response.success && response.data?.token) {
          this.persistSession(response.data);
          this.authStatusSubject.next(true);
        }
      })
    );
  }

  /**
   * Cierra la sesión y limpia el almacenamiento.
   */
  logout(): void {
    localStorage.removeItem(AUTH_KEYS.TOKEN);
    localStorage.removeItem(AUTH_KEYS.ROLE);
    localStorage.removeItem(AUTH_KEYS.USER_DATA);
    this.authStatusSubject.next(false);
    this.router.navigate(['/login']);
  }

  private persistSession(data: LoginResponse): void {
    localStorage.setItem(AUTH_KEYS.TOKEN, data.token!);

    const decoded: any = jwtDecode(data.token!);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || decoded.role;

    localStorage.setItem(AUTH_KEYS.ROLE, role);
    localStorage.setItem(AUTH_KEYS.USER_DATA, JSON.stringify({
      username: data.username,
    }));
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_KEYS.TOKEN);
  }

  getUserRole(): string | null {
    return localStorage.getItem(AUTH_KEYS.ROLE);
  }

  isLoggedIn(): boolean {
    return this.hasToken() && !this.isTokenExpired();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(AUTH_KEYS.TOKEN);
  }

  private isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const timeout = decoded.exp * 1000;
    return Date.now() > timeout;
  }
}
