import { Injectable } from '@angular/core';
// import { Headers, Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
// import { GetScreenDetailService } from '../../_sharedresource/_services/get-screen-detail.service';
// import { AuditTrial } from '../../financialModule/_models/general-ledger-configuration-setup/audit-trial';
import { Page } from '../page';
import { Constants } from '../Constants';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GetScreenDetailService } from './get-screen-detail.service';
import { retry, catchError, map } from 'rxjs/operators';
import { GlobalApiCallService } from './global-api-call.service';

interface location {
  "ip": any,
  "city": any,
  "region": any,
  "region_code": any,
  "country": any,
  "country_name": any,
  "continent_code": any,
  "in_eu": any,
  "postal": any,
  latitude: any,
  longitude: any,
  "timezone": any,
  "utc_offset": any,
  "country_calling_code": any,
  "currency": any,
  "languages": any,
  "asn": any,
  "org": any,
  country_code: any,
  country_code_iso3: any,
  country_capital: any,
  country_tld: any,
  currency_name: any,
  country_area: any,
  country_population: any,

}

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class CommonServices {
  private headers = new HttpHeaders({ 'content-type': 'application/json', "Access-Control-Allow-Origin": "*" });

  public verifyUserUrl = Constants.userModuleApiBaseUrl + 'users/authorizeUser';
  public updateUserLocationUrl = Constants.userModuleApiBaseUrl + 'users/saveUserLocation';
  public getDriversLocationFromRecordUrl = Constants.userModuleApiBaseUrl + 'users/getAllDriversLocation';
  public calculateDistanceUrl = Constants.userModuleApiBaseUrl + 'users/calculateDistance';
  public getBiddingsByIdUrl = Constants.userModuleApiBaseUrl + 'users/getBiddingsByDrivers';
  public saveBiddingRequestUrl = Constants.userModuleApiBaseUrl + 'users/saveRideRequestForBidding';
  public cancelBiddingRequestUrl = Constants.userModuleApiBaseUrl + 'users/cancelRideRequestForBidding';
  public savePriceAgainstBidUrl = Constants.userModuleApiBaseUrl + 'users/savePriceAgainstBid';
  public getBiddingsRequestForDriversUrl = Constants.userModuleApiBaseUrl + 'users/getRideRequestForBiddings';
  public manageSelectedRideUrl = Constants.userModuleApiBaseUrl + 'users/manageSelectedRide';
  public getUserByUserIdUrl = Constants.userModuleApiBaseUrl + 'users/getUserByUserId';
  public getLocationByUserIdUrl = Constants.userModuleApiBaseUrl + 'users/getLocationByUserId';
  public completeUserRideUrl = Constants.userModuleApiBaseUrl + 'users/completeUserRide';
  public getTravelHistoryByUserIdUrl = Constants.userModuleApiBaseUrl + 'users/getTravelHistoryByUserId';
  public updateUserUrl = Constants.userModuleApiBaseUrl + 'users/updateUser';
  public getManageRideByIdUrl = Constants.userModuleApiBaseUrl + 'users/getManageRideById';
  public getAllUsersUrl = Constants.userModuleApiBaseUrl + 'users/getAllUsers';
  public getAllDriversUrl = Constants.userModuleApiBaseUrl + 'users/getAllDrivers';
  public getAllTravelHistoryUrl = Constants.userModuleApiBaseUrl + 'users/getAllTravelHistory';
  public logOutUrl = Constants.userModuleApiBaseUrl + 'users/logOutUser';

  userData: any = {};
  currentLanguage = "";
  dynamicHeader: any;
  changedValue;
  hasMsg: boolean = false;
  showMsg: boolean = false;
  isSuccessMsg: boolean = false;
  isfailureMsg: boolean = false;
  messageText;
  gridLists;
  moduleName;
  screenName;
  availableFormValues: [object];
  getScreenDetailArr;
  mandatory: boolean;
  isShowHideGrid = false;
  constructor(private http: HttpClient, private getScreenDetailService: GetScreenDetailService, private globalApiService: GlobalApiCallService) {
    // if (localStorage.getItem('currentUser')) {
    //   this.userData = JSON.parse(localStorage.getItem('currentUser'));
    //   this.headers = this.headers.append('session', this.userData.session);
    //   this.headers = this.headers.append('userid', this.userData.userId.toString());
    //   this.currentLanguage = localStorage.getItem('currentLanguage') ?
    //     localStorage.getItem('currentLanguage') : "1";
    //   this.headers = this.headers.append("langid", this.currentLanguage);
    //   this.headers = this.headers.append("tenantid", localStorage.getItem('tenantid'));
    // } else {
    //   this.userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    //   this.headers = this.headers.append('session', 'B9D9A8EAFD86988A');
    //   this.headers = this.headers.append('userid', '23');
    //   this.currentLanguage = localStorage.getItem('currentLanguage') ?
    //     localStorage.getItem('current Language') : "1";
    //   this.headers = this.headers.append("langid", this.currentLanguage);
    //   this.headers = this.headers.append("tenantid", 'bti_algoras_salah');
    // }
  }

  logOut(userId: string) {
    return this.http.post(this.logOutUrl,
      {
        userId,
        currentLanguage: localStorage.getItem('currentLanguage'),
        languageOrientation: localStorage.getItem('languageOrientation'),
        currentLanguageName: localStorage.getItem('currentLanguageName'),
      })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getAllTravelHistory(requestBody) {
    return this.http.post(this.getAllTravelHistoryUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getAllDrivers(requestBody) {
    return this.http.post(this.getAllDriversUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getAllUsers(requestBody) {
    return this.http.post(this.getAllUsersUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getManageRideById(requestBody) {
    return this.http.post(this.getManageRideByIdUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getTravelHistoryByUserId(requestBody) {
    return this.http.post(this.getTravelHistoryByUserIdUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  completeUserRide(requestBody) {
    return this.http.post(this.completeUserRideUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getLocationByUserId(requestBody) {
    return this.http.post(this.getLocationByUserIdUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  updateUser(requestBody) {
    return this.http.post(this.updateUserUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getUserByUserId(requestBody) {
    return this.http.post(this.getUserByUserIdUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  manageSelectedRide(requestBody) {
    return this.http.post(this.manageSelectedRideUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  savePriceAgainstBid(requestBody) {
    return this.http.post(this.savePriceAgainstBidUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  cancelBiddingRequest(requestBody) {
    return this.http.post(this.cancelBiddingRequestUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  saveBiddingRequest(requestBody) {
    return this.http.post(this.saveBiddingRequestUrl, requestBody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getBiddings(id) {
    return this.http.post(this.getBiddingsByIdUrl, { id: id })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  getBiddingsRequestForDrivers() {
    return this.http.get(this.getBiddingsRequestForDriversUrl)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }
  saveUserLocationInRecord(reqbody) {
    return this.http.post(this.updateUserLocationUrl, reqbody)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getDriversLocationFromRecord() {
    return this.http.get(this.getDriversLocationFromRecordUrl,)
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  getLocationBySearchFilters(searchKeywords) {
    return this.http.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAI5PD5oZ47dq35Teubj69CyxDsxmgrIFI')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);

  }
  verifyUser(session, email) {
    return this.http.post(this.verifyUserUrl, { session: session, user_email: email })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  calculateDistance(destination, origin) {
    return this.http.post(this.calculateDistanceUrl, { destination, origin })
      .toPromise()
      .then(res => res)
      .catch();
  }
  getLocation() {
    return this.http.get<location>('https://ipapi.co/json/')
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  //error handler
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  changeInputNumber(elemId) {

    var el = $("#" + elemId);
    el.prop('type', 'number');
    el.prop('step', '.001');
    el.prop("autocomplete", false); // remove autocomplete (optional)
    el.on('keyup', function (e) {
      var amt = $(this).val().split(".");
      if (amt.length == 1 && amt[0].length >= 20) {
        $(this).val(amt[0].slice(0, 20))
      }
      else {
        if (amt.length > 1 && amt[1].length >= 3) {
          $(this).val(amt[0] + "." + amt[1].slice(0, 3))

        }
        if (amt.length > 1 && amt[0].length >= 20) {
          $(this).val(amt[0].slice(0, 20) + "." + amt[1])

        }
      }
    });
    el.on('keydown', function (e) {
      var amt = $(this).val().split(".")
      var allowedKeyCodesArr = [9, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 37, 39, 109, 189, 46, 110, 190];  // allowed keys
      if ($.inArray(e.keyCode, allowedKeyCodesArr) === -1 && (e.keyCode != 17 && e.keyCode != 86)) {  // if event key is not in array and its not Ctrl+V (paste) return false;
        e.preventDefault();
      } else if ($(this).val().length >= 20 && e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39) {
        e.preventDefault()
      }

      else if ($.trim($(this).val()).indexOf('.') > -1 && $.inArray(e.keyCode, [110, 190]) != -1) {  // if float decimal exists and key is not backspace return fasle;
        e.preventDefault();
      } else {
        return true;
      };
    }).on('paste', function (e) {  // on paste
      var pastedTxt = e.originalEvent.clipboardData.getData('Text').replace(/[^0-9.]/g, '');  // get event text and filter out letter characters
      if ($.isNumeric(pastedTxt)) {  // if filtered value is numeric
        e.originalEvent.target.value = pastedTxt;
        e.preventDefault();
      } else {  // else 
        e.originalEvent.target.value = ""; // replace input with blank (optional)
        e.preventDefault();  // retur false
      };
    });
  }


  showPassword(passwordField) {
    var obj: any = document.getElementById(passwordField);
    obj.type = "text";
  }

  hidePassword(passwordField) {
    var obj: any = document.getElementById(passwordField);
    obj.type = "password";
  }

  changeInputText(elemId) {
    $("#" + elemId).prop('type', 'text');
    $("#" + elemId).prop('step', '');
  }

  onlyDecimalNumberKey(event) {
    let e = event;
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  }

}