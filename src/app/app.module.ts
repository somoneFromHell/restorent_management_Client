import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule} from 'primeng/dropdown'
import { MainModule } from './main/main.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { registerComponent } from './auth/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorComponent } from './auth/error/error.component';
import { ProfileComponent } from './main/pages/profile/profile.component';
import { MatTableModule,MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    registerComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DropdownModule,
    MainModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: jwtInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
