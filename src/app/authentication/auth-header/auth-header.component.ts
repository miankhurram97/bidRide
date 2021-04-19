import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {
  isActiveRoute = false;
  allLanguagesList: any = [];
  currentLanguage: string;
  currentLanguageId: string;
  currentLanguageName: string;
  Login = Constants.login;
  signup = Constants.signup;
  constructor(
    private router: Router,
    private screenDetailService: GetScreenDetailService,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.checkActiveRouter();
    this.getLanguages();
  }

  getLanguages() {

    this.allLanguagesList = [{
      isActive: true,
      languageId: 1,
      languageName: "English",
      languageOrientation: "LTR",
      languageStatus: "Active"
    },
    {
      isActive: true,
      languageId: 2,
      languageName: "اردو",
      languageOrientation: "RTL",
      languageStatus: "Active"
    }];
  }

  changeLanguage(lng) {
    this.currentLanguageId = lng.languageId;
    localStorage.setItem('currentLanguage', lng.languageId);
    this.currentLanguageName = lng.languageName;
    localStorage.setItem('currentLanguageName', this.currentLanguageName);
    localStorage.setItem('languageOrientation', lng.languageOrientation);
    window.location.reload();

  }

  checkActiveRouter() {
    if (this.router.url !== '/login' && this.router.url !== '/') {
      this.isActiveRoute = true;
    }
    if (this.router.url !== '/sinup' && this.router.url !== '/') {
      this.isActiveRoute = true;
    }
  }

  logOut() {
    if (localStorage.getItem('currentUser')) {
      var userData = JSON.parse(localStorage.getItem('currentUser'));
      this.authService.logOutBeforeCompanySelection(userData.userId).subscribe(data => {
        localStorage.setItem('currentUser', '');
        this.router.navigate(['login']);
      });
    } else {
      localStorage.setItem('currentUser', '');
      this.router.navigate(['login']);
    }
  }

  loginScreen() {
    this.router.navigate(['login']);
  }

  crateAccount() {
    // if (localStorage.getItem('currentUser')) {
    //   var userData = JSON.parse(localStorage.getItem('currentUser'));
    //   this.authService.logOutBeforeCompanySelection(userData.userId).subscribe(data => {
    //     localStorage.setItem('currentUser', '');
    //     this.router.navigate(['login']);
    //   });
    // } else {
    //   localStorage.setItem('currentUser', '');
    //   this.router.navigate(['login']);
    // }
    this.router.navigate(['sinup']);

  }
}
