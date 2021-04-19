import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatIconModule } from '@angular/material/icon';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { InvokeComponent } from './invoke/invoke.component';
import { SinupComponent } from './sinup/sinup.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    VerifyOtpComponent,
    AuthHeaderComponent,
    InvokeComponent,
    SinupComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatIconModule,
    NgxIntlTelInputModule,

  ],
  exports: [
    LoginComponent,
    SinupComponent,
    VerifyOtpComponent,
    InvokeComponent
  ]
})
export class AuthenticationModule { }
