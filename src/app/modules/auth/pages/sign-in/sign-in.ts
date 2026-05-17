import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from '../../../../core/services/account.service';
import { UiService } from '../../../../core/services/ui';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private uiService = inject(UiService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.uiService.loading('Validando credenciales...');

    this.accountService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.uiService.close();
        if (res.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.uiService.error(res.message || 'Credenciales inválidas');
        }
      },
      error: (err) => {
        this.uiService.error('Usuario o contraseña incorrectos', 'Error de Autenticación');
      }
    });
  }

  /**
   * Helper para aplicar clases de error de DaisyUI
   */
  isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }
}
