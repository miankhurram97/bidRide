import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { LoginService } from '../authentication-service/login.service';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { Router } from '@angular/router';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { Utils } from 'src/app/utils';
import { SelectDropdownService } from 'src/app/_sharedresources/_services/select-dropdown.service';

@Component({
  selector: 'app-sinup',
  templateUrl: './sinup.component.html',
  styleUrls: ['./sinup.component.scss']
})
export class SinupComponent implements OnInit {
  SignUp = Constants.signup;
  FirstName = Constants.firstName;
  LastName = Constants.lastName;
  Email = Constants.email;
  Phone = Constants.phone;
  Password = Constants.password;
  ConfirmPassword = Constants.confirmPassword;
  Driver = Constants.driver;
  Rider = Constants.rider;
  RideOptions = Constants.rideOptions;
  ForgotPassword = Constants.forgetPassword;
  passwordValidation = Constants.ConfirmPassword;
  RememberMe = Constants.rememberMe;
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Pakistan,];


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


  firstName: any;
  lastName: any;
  email: any;
  remember: any;
  password: any;
  passwordConfirm: any;
  phone: any;
  driver: boolean = false;
  sideDetailPreference: any;
  required = Constants.requiredValid;
  emailValidation = Constants.emailValidation;

  location: any;
  userData: any;
  rideOptionsArray: Array<any> = [
    { id: 1, itemName: 'Car Mini' },
    { id: 2, itemName: 'Bike' },
    { id: 3, itemName: 'Rickshaw' },
    { id: 4, itemName: 'Car plus' },
    { id: 5, itemName: 'Car Luxury' },

  ];
  selectedRideOption = [];

  constructor(
    private loginService: LoginService,
    private screenDetailService: GetScreenDetailService,
    private router: Router,
    public dropDown: SelectDropdownService,
    public commonService: CommonServices
  ) {
    this.getUserLocation();
  }

  ngOnInit() {
    this.checkRemeber();
    this.sideDetailPreference = "<h1>An integrated system with node computing</h1><ul><li>BidRide is a ride booking system provides a professional solution for travelling</li><li>\"BidRide\" expands the capabilities of node computing and adopts a global perspective</li><li>Facilities of all sizes can use the \"RideRide\"</li></ul>";

  }
  changeUserStatus(value) {
    this.driver = value;
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
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.Pakistan, CountryISO.Canada];
  }


  checkRemeber() {
    if (localStorage.getItem('userCredential') && localStorage.getItem('isRemember') === 'true') {
      this.remember = true;
      this.email = JSON.parse((localStorage.getItem('userCredential') as any)).username;
    } else {
      this.remember = false;
    }
  }

  updateLocation() {
    this.screenDetailService.getLocation().then(data => {
      var location = data;
      console.log(this.location);
      location.user_id = this.userData.userId;
      location.user_email = this.userData.email;
      location.active = this.userData.isActive;
      location.user_driver = this.userData.driver;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            console.log(location);
            
            this.commonService.saveUserLocationInRecord(location).then(data => {
              console.log(data);

              localStorage.setItem('userLocation', JSON.stringify(data.result));

            })
          }
        })
      }

    })

  }
  login(loginForm) {
    this.getUserLocation();

    this.loginService.signUp(
      loginForm.value.firstName,
      loginForm.value.lastName,
      loginForm.value.email,
      loginForm.value.password,
      loginForm.value.phone,
      this.driver, this.selectedRideOption,this.location).then(data => {
        console.log(data);
        if (data) {
          this.userData = data.result;
          this.updateLocation();
        }
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
            this.messageText = data.error;
            return false;
          }, 100)
          window.setTimeout(() => {
            this.hasMsg = false;
          }, 4000)
        }
      })
  }
  onItemSelect(label, value) {
    Utils.onItemSelect(label);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = value;
    }
  }
  onItemDeSelect(label, selectedId) {
    Utils.onItemDeSelect(label, selectedId);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = [];
    }
  }
  onDeSelectAll(label) {
    Utils.onDeSelectAll(label);
    if (label == 'selectedRideOptionLabel') {
      this.selectedRideOption = [];
    }
  }
  onlyDecimalNumberKey(event) {
    return this.screenDetailService.onlyDecimalNumberKey(event);
  }
}
