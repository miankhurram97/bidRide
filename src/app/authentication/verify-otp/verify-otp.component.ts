import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from '../authentication-service/login.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent implements OnInit {
  verifyOtp: any;
  userName: any;
  password: any;
  userId: any;
  isResetPassword: any;

  messageText;
  hasMsg = false;
  showMsg = false;
  isSuccessMsg;
  isfailureMsg;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.getDetailsForOTP();

  }

  getDetailsForOTP() {
    this.verifyOtp = this.activatedRoute.snapshot.params.otp;
    let currentActiveUser = JSON.parse(localStorage.getItem('userCredential'));
    this.userName = currentActiveUser.username;
    this.password = currentActiveUser.password;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.isResetPassword = params['isResetPassword'];
    });
  }

  newOtp() {
    // this.loginService.loginUserForOTP(this.userName, this.password).subscribe(data => {
    //   if (data.status !== 'NOT_FOUND') {
    //     window.setTimeout(() => {
    //       this.isSuccessMsg = true;
    //       this.isfailureMsg = false;
    //       this.showMsg = true;
    //       this.verifyOtp = data.result.otp;
    //       this.messageText = data.btiMessage.message;
    //     }, 100);
    //     this.hasMsg = true;
    //     window.setTimeout(() => {
    //       this.showMsg = false;
    //       this.hasMsg = false;
    //     }, 4000)
    //   }
    // }),
    //   error => {
    //     this.hasMsg = true;
    //     window.setTimeout(() => {
    //       this.isSuccessMsg = false;
    //       this.isfailureMsg = true;
    //       this.showMsg = true;
    //       this.messageText = error._body.split(',')[4].split(':')[1].replace('"', '').replace('"', '');
    //     }, 100);
    //   };
  }

  verifyOtpForCompanySelection(verifyOtpForm) {
    this.loginService.verifyOtpAuthentication(this.userId, verifyOtpForm.value.verifyOtp).subscribe(data => {
      var code = data.code;
      if (code == "200") {
        localStorage.setItem('currentUser', JSON.stringify(data.result));
        localStorage.setItem('isResetPassword', this.isResetPassword);
        localStorage.setItem('tenantid', '');
        if (data.result.role == 'USER') {
          this.router.navigate(["select-company"]);
        }
        else {
          if (this.isResetPassword == 'Y') {
            // this.router.navigate(['resetpassword', data.result.userId]);
          }
          else {
            this.router.navigate(["dashboard"]);
          }
        }
      }
      else {
        if (data.result.otpMaxLimitReached != undefined && data.result.otpMaxLimitReached == true) {
          this.isSuccessMsg = false;
          this.isfailureMsg = true;
          this.hasMsg = true;
          this.showMsg = true;
          this.messageText = data.btiMessage.message;
          window.setTimeout(() => {
            // this.router.navigate(['login']);
          }, 2000);
        }
        localStorage.setItem('currentUser', JSON.stringify(data.result));
        this.isSuccessMsg = false;
        this.isfailureMsg = true;
        this.hasMsg = true;
        this.showMsg = true;
        this.messageText = data.btiMessage.message;
        window.setTimeout(() => {
          this.showMsg = false;
          this.hasMsg = false;
        }, 2000);
        if (this.isResetPassword == 'Y') {
          this.router.navigate(['resetpassword', data.result.userId]);
        }
      }
    });

  }

}
