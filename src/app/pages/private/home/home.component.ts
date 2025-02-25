import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@pages/public/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [ButtonModule, CommonModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  user$ = this.authService.user$.pipe(
    map(user => {
      if (!user) return null;
      return JSON.parse(JSON.stringify(user));
    })
  );

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
