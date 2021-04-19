declare const $: any;
import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GetScreenDetailService } from './_sharedresources/_services/get-screen-detail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bid Ride New Application';
  location: any = {};
  selectedTheme: string = "";
  model: any = {
  }
  constructor(
    @Inject(DOCUMENT) private document: any,
    private screenDetailService: GetScreenDetailService,
    private router: Router
  ) { 
    this.model = {
      mainColor: '#2b90c1',
      sideBar: '#2b90c1',
      mainColorHover: '#273837fa',
      btnSuccess: '#1AA79C',
      btnSuccessHover: '#1FC7BA',
      btnWarning: '#EA724B',
      btnWarningHover: '#D67D60',
      btnGreen: '#8AC541',
      btnGreenHover: '#B5E080',
      btnInfo: '#007BFF',
      btnInfoHover: '#007BFF',
      btnDanger: '#E74C3C',
      btnDangerHover: '#ED7669',
      btnPrimary: '#0073AA',
      btnPrimaryHover: '#0095DD'
    };
    this.getColorSetting(this.model);
  }

  ngOnInit() {
    // setInterval(this.updateSession.bind(this), 60000);
    // setInterval(this.getUserLocation.bind(this), 60000);
    this.checkLanguageInStorage();
    const langId = localStorage.getItem('currentLanguage');
    if (langId == '1') {
      this.selectedTheme = 'ltr';
    } else {
      this.selectedTheme = 'rtl';
    }
  }
  getColorSetting(model) {

    this.document.documentElement.style.setProperty('--main-color', model.mainColor);
    this.document.documentElement.style.setProperty('--side-bar', model.sideBar);
    this.document.documentElement.style.setProperty('--main-color-hover', model.mainColorHover);
    this.document.documentElement.style.setProperty('--btnSuccess', model.btnSuccess);
    this.document.documentElement.style.setProperty('--btnSuccessHover', model.btnSuccessHover);
    this.document.documentElement.style.setProperty('--btnWarning', model.btnWarning);
    this.document.documentElement.style.setProperty('--btnWarningHover', model.btnWarningHover);
    this.document.documentElement.style.setProperty('--btnGreen', model.btnGreen);
    this.document.documentElement.style.setProperty('--btnGreenHover', model.btnGreenHover);
    this.document.documentElement.style.setProperty('--btnInfo', model.btnInfo);
    this.document.documentElement.style.setProperty('--btnInfoHover', model.btnInfoHover);
    this.document.documentElement.style.setProperty('--btnDanger', model.btnDanger);
    this.document.documentElement.style.setProperty('--btnDangerHover', model.btnDangerHover);
    this.document.documentElement.style.setProperty('--btnPrimary', model.btnPrimary);
    this.document.documentElement.style.setProperty('--btnPrimaryHover', model.btnPrimaryHover);

  }
  getUserLocation() {
    this.screenDetailService.getLocation().then(data => {
      this.location = data;
      console.log(this.location);

      localStorage.setItem('userLocation', JSON.stringify(this.location));
    })
  }
  checkLanguageInStorage() {
    var languageOrientation = localStorage.getItem('languageOrientation');
    if (languageOrientation == 'LTR') {

      this.document.getElementById('main-file').setAttribute('href', 'assets/css/theme-css/style.css');
      this.document.getElementById('main-custom-file').setAttribute('href', 'assets/css/custom-style.css');
    } else if (languageOrientation == "RTL") {

      this.document.getElementById('main-file').setAttribute('href', 'assets/css/theme-css/style.css');
      this.document.getElementById('main-custom-file').setAttribute('href', 'assets/css/custom-rtl-style.css');
    } else {

      localStorage.setItem('currentLanguage', '1');
      localStorage.setItem('languageOrientation', 'LTR');

      this.document.getElementById('main-file').setAttribute('href', 'assets/css/theme-css/style.css');
      this.document.getElementById('main-custom-file').setAttribute('href', 'assets/css/custom-style.css');
    }
  }

  updateSession() {
    if (localStorage.getItem('currentUser') && localStorage.getItem('tenantid')) {
      this.screenDetailService.UpdateActiveSession().subscribe(currentdata => {
        if (currentdata.btiMessage.messageShort != 'USER_UPDATED_SUCCESS') {
          localStorage.setItem('currentUser', '');
          this.router.navigate(['login']);
        };
      });
    }
  }
}
