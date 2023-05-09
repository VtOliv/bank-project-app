import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InterceptorModule } from './services/interceptor.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    InterceptorModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
