import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import {CommonModule, registerLocaleData} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SmallCardComponent } from './shared/component/small-card/small-card.component';
import { PopupCardComponent } from './shared/component/popup-card/popup-card.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SmallCardComponent,
    PopupCardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptor, multi: true //Multi : true permet d'ajouter plusieurs intercepteurs sans écraser les précédents
    }
  ],
  bootstrap: [AppComponent],
})


export class AppModule { }
