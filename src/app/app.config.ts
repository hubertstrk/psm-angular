import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import {
  provideTanStackQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTanStackQuery(new QueryClient()),
  ],
}
