import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { GlobalApiCallService } from './_services/global-api-call.service';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  private headers = new HttpHeaders({ 'content-type': 'application/json' });

  constructor(private http: HttpClient, private globalApiService: GlobalApiCallService) {
    var userData = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = this.headers.append('session', userData.session);
    this.headers = this.headers.append('userid', userData.userId.toString());
    var currentLanguage = localStorage.getItem('currentLanguage') ?
        localStorage.getItem('currentLanguage') : "1";
    this.headers = this.headers.append("langid", currentLanguage);
    this.headers = this.headers.append("tenantid", localStorage.getItem('tenantid'));
}

  transform(url: string) {

    return new Observable<string>((observer) => {
      // This is a tiny blank image
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      // The next and error callbacks from the observer
      const {next, error} = observer;

      this.http.get(url, { headers: this.headers, responseType: 'blob' }).subscribe((response:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(response._body);
        reader.onloadend = function() {
          observer.next((reader as any).result);
        };
      });

      return {unsubscribe() {  }};
    });
  }
}