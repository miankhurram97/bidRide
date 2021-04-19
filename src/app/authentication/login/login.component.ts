import { Component, OnInit } from '@angular/core';
import { LoginService } from '../authentication-service/login.service';
import { Constants } from 'src/app/_sharedresources/Constants';
import { Router } from '@angular/router';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { Utils } from 'src/app/utils';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  messageText;
  hasMsg = false;
  showMsg = false;
  isSuccessMsg;
  isfailureMsg;

  MyIP;
  userId: number;
  otp: string;
  isResetPassword: string;
  isActive: number;
  currentLanguage: string;
  currentLanguageId: string;
  currentLanguageName: string;
  arrLanguage: any = [];
  atATimeText = Constants.atATimeText;

  userName: any;
  remember: any;
  password: any;

  sideDetailPreference: any;
  location: any = {};
  required = Constants.requiredValid;
  emailValidation = Constants.emailValidation;
  email = Constants.email;
  Login = Constants.login;
  Password = Constants.password;
  forgetPassword = Constants.forgetPassword;
  rememberMe = Constants.rememberMe;
  constructor(
    private loginService: LoginService,
    private screenDetailService: GetScreenDetailService,
    private router: Router,
    public commonService: CommonServices
  ) {
    this.getUserLocation();
  }

  ngOnInit() {
    this.checkRemeber();
    this.sideDetailPreference = "<h1>An integrated system with node computing</h1><ul><li>BidRide is a ride booking system provides a professional solution for travelling</li><li>\"BidRide\" expands the capabilities of node computing and adopts a global perspective</li><li>Facilities of all sizes can use the \"RideRide\"</li></ul>";
  }

  getUserLocation() {
    this.screenDetailService.getLocation().then(data => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.location = data;
            this.location.latitude = position.coords.latitude;
            this.location.longitude = position.coords.longitude;

            Utils.hideLoader('#main');
          }
        })
      }

      localStorage.setItem('userLocation', JSON.stringify(this.location));
    })
  }

  checkRemeber() {
    if (localStorage.getItem('userCredential') && localStorage.getItem('isRemember') === 'true') {
      this.remember = true;
      this.userName = JSON.parse((localStorage.getItem('userCredential') as any)).username;
    } else {
      this.remember = false;
    }
  }

  login(loginForm) {
    this.getUserLocation();
    this.location.user_name = '';
    this.location.phone = '';
    this.loginService.loginUserForMainPage(loginForm.value.userName, loginForm.value.password, this.location).then(data => {

      if (data.result != undefined && data.result != 'undefined') {
        this.userId = data.result.userId;
        this.otp = data.result.otp;
        this.isResetPassword = data.result.isResetPassword;
        if (loginForm.value.remember) {
          localStorage.setItem('userCredential', loginForm.value);
          localStorage.setItem('isRemember', loginForm.value.remember);
        } else {
          localStorage.setItem('isRemember', 'false');
        }
        // storing credential
        var userCredential = { 'username': loginForm.value.userName };
        // localStorage.setItem('userCredential', JSON.stringify(userCredential));
        // this.router.navigate(['verify-otp', this.userId, this.otp, this.isResetPassword]);
        localStorage.setItem('currentUser', JSON.stringify(data.result));
        localStorage.setItem('languageOrientation', 'LTR');
        localStorage.setItem('currentModule', '12');

        localStorage.setItem('currentArabicModule', '14');

        localStorage.setItem('currentCompany', 'BAAN For Technology Int');

        localStorage.setItem('SidebarMenus', '');


        this.router.navigate(['dashboard']);

        Utils.notification(data.message, 'success');

      }
      else {
        this.hasMsg = true;
        window.setTimeout(() => {
          this.isSuccessMsg = false;
          this.isfailureMsg = true;
          this.showMsg = true;
          this.messageText = data.message;
          return false;
        }, 100)
      }
    })
  }

}
