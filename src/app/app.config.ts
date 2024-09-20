import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch  } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import {provideAnimations} from '@angular/platform-browser/animations'

export const appConfig: ApplicationConfig = {
  providers: [
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideRouter(routes)]
};
