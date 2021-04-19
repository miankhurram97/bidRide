import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalApiCallService {

  constructor(private httpClient: HttpClient) { }

  get headers() {
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : '';
    const currentLanguage = localStorage.getItem('currentLanguage');
    const tenantid = localStorage.getItem('tenantid');
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      session: userData ? userData.session : '',
      userid: userData ? userData.userId.toString() : '',
      langid: currentLanguage ? currentLanguage : '1',
      tenantid: tenantid ? tenantid : '',
    });
    return headers;
  }

  postRequest(apiUrl, requestBody, paramHeaders?): Observable<any> {
    return this.httpClient.post<any>(apiUrl, requestBody, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  putRequest(apiUrl, requestBody, paramHeaders?) {
    return this.httpClient.put<any>(apiUrl, requestBody, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getRequest(apiUrl, paramHeaders?): Observable<any> {
    return this.httpClient.get<any>(apiUrl, { headers: this.headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // console.log(errorMessage);
    }
    return throwError(errorMessage);
  }
}
