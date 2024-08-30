import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InterceptorModule } from './services/interceptor.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { LoginComponent } from './components/login/login.component';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { TableModule } from 'primeng/table';
import { InputOtpModule } from 'primeng/inputotp';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ExtratoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    InterceptorModule,
    ButtonModule,
    InputTextModule,
    KeyFilterModule,
    MenubarModule,
    CardModule,
    DialogModule,
    ToastModule,
    InputNumberModule,
    RadioButtonModule,
    TabViewModule,
    RippleModule,
    SelectButtonModule,
    TableModule,
    InputOtpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
