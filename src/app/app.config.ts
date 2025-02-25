import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { errorInterceptor } from '@core/error/error.interceptor';
import { loadingInterceptor } from '@core/loading/loading.interceptor';
import { authInterceptor } from '@pages/public/auth/auth.interceptor';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { environment } from 'src/environments/environment';
import { Noir } from '../styles';
import { routes } from './app.routes';

export function tokenGetter(): string | null {
  return localStorage.getItem('JWT_TOKEN');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, errorInterceptor, loadingInterceptor])
    ),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(
      ToastModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: [environment.apiUrl],
          disallowedRoutes: ['http://example.com/examplebadroute/'],
        },
      })
    ),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      ripple: true,
      theme: {
        preset: Noir,
        options: {
          darkModeSelector: '.my-app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'tailwind, primeng',
          },
        },
      },
    }),
  ],
};
