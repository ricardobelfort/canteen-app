import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMsg = 
        (typeof error.error === 'string' && error.error) ||
        error.error?.error ||
        error.error?.message ||
        error.message ||
        'Ocorreu um erro inesperado.';
    
      messageService.add({
        severity: 'error',
        summary: `Erro ${error.status}`,
        detail: errorMsg,
      });
    
      return throwError(() => error);
    })    
  );
};