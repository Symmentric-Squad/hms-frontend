import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * JWT Interceptor
 * Attaches Authorization header (Bearer token) to outgoing HTTP requests when available.
 * Register this interceptor in your AppModule providers array (HTTP_INTERCEPTORS).
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: adjust where you store tokens (localStorage / cookie / AuthService)
    const token = localStorage.getItem('auth_token');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
