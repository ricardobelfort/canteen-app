import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TagModule } from 'primeng/tag';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ReactiveFormsModule,
    DividerModule,
    TagModule,
    RouterLink,
    DialogModule,
    IftaLabelModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.minLength(5)]],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')],
    ],
  });

  showPassword = false;
  visible = false;
  passwordTouched = false;

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.authService.login({ email, password }).subscribe({
        next: () => {
          const userRoles = this.authService.getUserRoles();

          if (userRoles.length > 0) {
            // ✅ Usuário tem role válida -> Acesso permitido
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Login realizado com sucesso',
            });
            this.router.navigate(['/dashboard']);
          } else {
            // 🚨 Usuário NÃO tem role válida -> Faz logout e exibe erro
            this.authService.logout();
            this.messageService.add({
              severity: 'error',
              summary: 'Acesso negado',
              detail: 'Você não tem permissão para acessar o sistema.',
            });
            this.router.navigate(['/auth/login']); // 🔄 Retorna à tela de login
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro no login',
            detail: err.message || 'Erro inesperado ao fazer login.',
          });
        },
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'E-mail e senha são obrigatórios',
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  onPasswordInput(): void {
    const passwordValue = this.password?.value || '';

    if (passwordValue.length > 0) {
      this.passwordTouched = true;
    } else {
      this.passwordTouched = false;
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  passwordHasLowerCase(): boolean {
    return /[a-z]/.test(this.password?.value || '');
  }

  passwordHasUpperCase(): boolean {
    return /[A-Z]/.test(this.password?.value || '');
  }

  passwordHasNumber(): boolean {
    return /\d/.test(this.password?.value || '');
  }

  passwordHasMinLength(): boolean {
    return (this.password?.value || '').length >= 8;
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  showDialog() {
    this.visible = true;
  }

  recovery() {
    this.router.navigate(['/auth/recovery-password']);
  }
}
