import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/_sharedresources/Constants';
import { GlobalApiCallService } from 'src/app/_sharedresources/_services/global-api-call.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({ 'content-type': 'application/json' });
  userId: any;

  private getProfileUrl = Constants.userModuleApiBaseUrl + 'user/getAdminProfileDetail';
  private updateProfileUrl = Constants.userModuleApiBaseUrl + '/user/updateAdminProfile';
  private matchOldPasswordUrl = Constants.userModuleApiBaseUrl + 'matchOldPassword';
  private logOutUrl = Constants.userModuleApiBaseUrl + 'user/logout';
  private logOutBeforeCompanySelectionUrl = Constants.userModuleApiBaseUrl + 'user/logoutBeforeCompanySelection';

  constructor(
    private globalApiService: GlobalApiCallService,
    private router: Router
  ) {
    if (localStorage.getItem('currentUser')) {
      const userData = JSON.parse(localStorage.getItem('currentUser'));
      this.userId = userData.userId;
      this.headers.append('session', userData.session);
      this.headers.append('userid', userData.userId.toString());
      const currentLanguage = localStorage.getItem('currentLanguage') ?
        localStorage.getItem('currentLanguage') : '1';
      this.headers.append('langid', currentLanguage);
      this.headers.append('tenantid', localStorage.getItem('tenantid'));
    } else {
      this.router.navigate(['login']);
    }
  }

  // getProfile(userId: string) {
  //   return this.http.post(this.getProfileUrl, { 'userId': this.UserId }, { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // getoldPassword(userId: string, password: string) {
  //   return this.http.post(this.matchOldPasswordUrl, { 'userId': this.UserId, 'password': password }, { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  // updateProfile(settings: Settings) {
  //   return this.http.post(this.updateProfileUrl, JSON.stringify(settings), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  logOut(userId: string) {
    let newHeaders = new HttpHeaders();
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    newHeaders = newHeaders.append('session', userData.session);
    newHeaders = newHeaders.append('content-type', 'application/json');
    newHeaders = newHeaders.append('userid', userData.userId.toString());
    const currentLanguage = localStorage.getItem('currentLanguage') ?
      localStorage.getItem('currentLanguage') : '1';
    newHeaders = newHeaders.append('langid', currentLanguage);
    newHeaders = newHeaders.append('tenantid', localStorage.getItem('tenantid'));
    return this.globalApiService.postRequest(this.logOutUrl, { userId }, newHeaders);
  }

  logOutBeforeCompanySelection(userId: string) {
    let newHeaders = new HttpHeaders();
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    newHeaders = newHeaders.append('session', userData.session);
    newHeaders = newHeaders.append('content-type', 'application/json');
    newHeaders = newHeaders.append('userid', userId.toString());
    const currentLanguage = localStorage.getItem('currentLanguage') ?
      localStorage.getItem('currentLanguage') : '1';
    newHeaders = newHeaders.append('langid', currentLanguage);
    newHeaders = newHeaders.append('tenantid', localStorage.getItem('tenantid'));
    return this.globalApiService.postRequest(this.logOutBeforeCompanySelectionUrl, { userId }, newHeaders);
  }
}
