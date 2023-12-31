import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PublicGuard } from './shared/guards/public.guard';
import { EventsComponent } from './events/events.component';
import {MailConfirmationComponent} from "./mail-confirmation/mail-confirmation.component";

const routes: Routes = [
  // Ajoutez vos routes ici, par exemple :
  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'events', component: EventsComponent, canActivate: [AuthGuard] },
  { path: 'mailConfirm/:token', component: MailConfirmationComponent, canActivate: [PublicGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
