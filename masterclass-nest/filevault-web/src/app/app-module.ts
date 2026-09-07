import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { App } from './app';
import { LoginComponent } from './auth/login/login.component';
import { authInterceptor } from './auth/auth.interceptor';
import { FilesComponent } from './files/files.component';
import { routes } from './app-routing-module';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    LoginComponent,
    FilesComponent,
    RouterModule.forRoot(routes),
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule { }
