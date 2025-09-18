import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { provideToastr } from 'ngx-toastr';

import { HttpErrorInterceptor } from '@core/interceptors';
import * as services from '@core/services';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true
    }),
    services.IconsRegistryService,
    services.ToastService,
    {
      deps: [services.IconsRegistryService],
      provide: APP_INITIALIZER,
      useFactory: services.loadIconsRegistry,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
};
