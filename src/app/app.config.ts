import { ApplicationConfig } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      // replaces scrollPositionRestoration: 'enabled'
      withInMemoryScrolling({ 
        scrollPositionRestoration: 'enabled', 
        anchorScrolling: 'enabled' 
      }),
      // Other features can be added here, e.g., withViewTransitions()
    ),
    provideHttpClient(
      withInterceptors([JwtInterceptor])
    )
  ]
};