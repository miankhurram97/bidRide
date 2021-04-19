import { Injectable } from '@angular/core';
import { GlobalApiCallService } from 'src/app/_sharedresources/_services/global-api-call.service';
import { Constants } from 'src/app/_sharedresources/Constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginForMainPage = Constants.userModuleApiBaseUrl + 'users/login';
  private verifyOtpUrl = Constants.userModuleApiBaseUrl + 'login/verifyOtpAuthentication';
  private signUpUrl = Constants.userModuleApiBaseUrl + 'users/postusers';
  private resetPasswordUrl = Constants.userModuleApiBaseUrl + 'users/resetPassword';



  constructor(
    private globalApiService: GlobalApiCallService,
    private http: HttpClient
  ) { }

  loginUserForMainPage(userName, password, user_location) {
    return this.http.post(this.loginForMainPage, { user_email: userName, user_password: password, user_location: user_location })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  resetPassword(email) {
    return this.http.post(this.resetPasswordUrl, { user_email: email })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  signUp(firstname, lastname, email, password, phone, driver, rideOption, user_location) {
    const reqBody: any = {
      user_firstname: firstname,
      user_lastname: lastname,
      user_email: email,
      user_password: password,
      user_phone: phone,
      user_driver: driver,
      ride_option_id: rideOption.length ? rideOption[0].id : '',
      ride_option_name: rideOption.length ? rideOption[0].itemName : '',
    };
    console.log(reqBody);

    return this.http.post(this.signUpUrl, reqBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  verifyOtpAuthentication(userId: string, otp: string) {
    return this.globalApiService.postRequest(this.verifyOtpUrl, JSON.stringify({ userId, otp }));
  }

  //error handler
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}
