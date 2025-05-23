import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private ignoredUrls: string[] = [
    '/auth/login',
    // Agrega aquí más endpoints a ignorar
  ];

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const shouldIgnore = this.ignoredUrls.some(url => req.url.includes(url));
    const token = this.authService.getToken();
    let request = req;
    if (token && !shouldIgnore) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Si el error es 401, cerrar sesión y redirigir al login
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }
}
