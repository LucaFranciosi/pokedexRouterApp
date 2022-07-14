import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/services/auth/auth-guard/auth-guard.service';
import { LoginModule } from './features/login/login.module';
import { RegistrationModule } from './features/registration/registration.module';
import { InitModule } from './core/services/auth/initialization/init.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './features/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    //angular module
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,




  //pages
  HomeModule, //watch for Favourite inside
  RegistrationModule,
  LoginModule,


  //server comunication 
  InitModule,
  HttpClientModule,

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
