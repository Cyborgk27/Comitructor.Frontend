import { Component, inject, signal } from '@angular/core';
import { AccountService } from './core/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Comitructor.Frontend');

  private authService = inject(AccountService);

  isLoggedIn$ = this.authService.authStatus$;
}
