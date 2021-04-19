import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { GuestGuard } from './guards/guest.guard';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './authentication/login/login.component';
import { VerifyOtpComponent } from './authentication/verify-otp/verify-otp.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { InvokeComponent } from './authentication/invoke/invoke.component';


const appRoutes: Routes = [
  {
    path: 'invoke/:userId/:session/:tenantid/:companyId',
    component: InvokeComponent,
    // canActivate: [GuestGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [GuestGuard]
  },
  {
    path: 'verify-otp/:userId/:otp/:isRemember',
    component: VerifyOtpComponent,
    // canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always'
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true, paramsInheritanceStrategy: 'always' }),
    AuthenticationModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
