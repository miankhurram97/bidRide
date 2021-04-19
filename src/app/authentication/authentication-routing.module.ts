import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { GuestGuard } from '../guards/guest.guard';
import { SinupComponent } from './sinup/sinup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'sinup',
    component: SinupComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'resetPassowrd',
    component: ForgetPasswordComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'verify-otp/:userId/:otp/:isResetPassword',
    component: VerifyOtpComponent,
    // canActivate: [GuestGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
