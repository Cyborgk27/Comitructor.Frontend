import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/api';
import { UiService } from '../../../../core/services/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
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

    this.authService.apiAuthLoginPost(this.loginForm.value).subscribe({
      next: (res) => {
        this.uiService.close();
        if (res.success) {
          this.router.navigate(['/dashboard']);
        }
      },
      error: () => {
        this.uiService.error('Usuario o contraseña incorrectos', 'Error de Autenticación');
      }
    });
  }

  // Helpers para validación visual en HTML
  isValidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }
}
