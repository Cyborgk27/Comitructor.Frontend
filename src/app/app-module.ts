import { importProvidersFrom, NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { Sidebar } from './core/components/sidebar/sidebar';
import { ApiModule, Configuration } from './core/api';
import { environment } from '../environments/environment.development';

@NgModule({
  declarations: [App, Sidebar],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    importProvidersFrom(
      ApiModule.forRoot(() => {
        return new Configuration({
          basePath: environment.urlAddress,
        });
      })
    )
  ],
  bootstrap: [App],
})
export class AppModule {}
