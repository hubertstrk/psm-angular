import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideHttpClient } from '@angular/common/http'
import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental'
import { provideAnimations } from '@angular/platform-browser/animations'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      }),
      withDevtools()
    ),
    provideAnimations(),
  ],
}
