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
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SmallCardComponent } from './shared/component/small-card/small-card.component';
import { PopupCardComponent } from './shared/component/popup-card/popup-card.component';
import {MatDialogModule} from "@angular/material/dialog";
import { DialogComponent } from './shared/dialog/dialog.component';
import { FormComponent } from './shared/form/form.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxMatTimepickerDirective, NgxMatTimepickerFieldComponent, NgxMatTimepickerModule} from "ngx-mat-timepicker";
import { EventsComponent } from './events/events.component';

import { MailConfirmationComponent } from './mail-confirmation/mail-confirmation.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { DeleteComponent } from './shared/dialog/delete/delete.component';

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
    DialogComponent,
    FormComponent,
    EventsComponent, MailConfirmationComponent,
    EventsComponent, DeleteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxMatTimepickerFieldComponent,
    NgxMatTimepickerModule,
    NgxMatTimepickerDirective,
MatAutocompleteModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:  AuthInterceptor, multi: true //Multi : true permet d'ajouter plusieurs intercepteurs sans écraser les précédents
    }
  ],
  bootstrap: [AppComponent],
})


export class AppModule { }
