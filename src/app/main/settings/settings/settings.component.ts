import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { CountryISO } from 'ngx-intl-tel-input';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { Router } from '@angular/router';
import { SelectDropdownService } from 'src/app/_sharedresources/_services/select-dropdown.service';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { NgForm } from '@angular/forms';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  separateDialCode = true;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Pakistan,];

  UserSettings = Constants.userSettings;
  FirstName = Constants.firstName;
  LastName = Constants.lastName;
  Email = Constants.email;
  Phone = Constants.phone;
  Password = Constants.password;
  ConfirmPasswordValidation = Constants.ConfirmPasswordText;
  ConfirmPassword = Constants.confirmPassword;
  Update = Constants.update;
  Clear = Constants.clear;
  Cancel = Constants.btnCancelText;
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
  userInfo: any;
  id: any;
  constructor(private screenDetailService: GetScreenDetailService,
    private router: Router,
    public dropDown: SelectDropdownService,
    public commonService: CommonServices) { }

  ngOnInit() {
    this.getUserByUserId();
  }
  getUserByUserId() {
    this.userInfo = JSON.parse(localStorage.getItem('currentUser'));
    const requestBody: any = { user_id: this.userInfo.userId };
    this.commonService.getUserByUserId(requestBody).then(data => {
      this.id = data.result.userId;
      this.firstName = data.result.firstName;
      this.lastName = data.result.lastName;
      this.email = data.result.email;
      this.phone = data.result.phone;
      this.password = data.result.password;
      this.passwordConfirm = data.result.password;
    })
  }

  login(loginForm) {
    if (loginForm.valid) {
      const requestBody: any = {
        id: this.id,
        user_firstname: this.firstName,
        user_lastname: this.lastName,
        user_email: this.email,
        user_phone: this.phone,
        user_password: this.password
      };
      this.commonService.updateUser(requestBody).then(data => {
        if (data.message) {
          Utils.notification(data.message, 'success');
          localStorage.setItem('currentUser', JSON.stringify(data.result));
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
    }
  }

  clearForm(loginForm: NgForm) {
    loginForm.resetForm();
  }

  onlyDecimalNumberKey(event) {
    return this.screenDetailService.onlyDecimalNumberKey(event);
  }
}
