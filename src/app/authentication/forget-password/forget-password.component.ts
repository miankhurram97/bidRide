import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { LoginService } from '../authentication-service/login.service';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
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
  location: any;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.sideDetailPreference = "<h1>An integrated system with node computing</h1><ul><li>BidRide is a ride booking system provides a professional solution for travelling</li><li>\"BidRide\" expands the capabilities of node computing and adopts a global perspective</li><li>Facilities of all sizes can use the \"RideRide\"</li></ul>";
  }

  resetPassword(loginForm) {
    if (loginForm.valid) {
      this.loginService.resetPassword(this.userName).then(data => {
        if (data.result == '1') {
          Utils.notification(data.message, 'success');
        }else{
          Utils.notification('invalid email', 'error');
        }
      })
    }
  }
}
