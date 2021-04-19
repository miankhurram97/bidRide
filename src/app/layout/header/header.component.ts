import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { Utils } from 'src/app/utils';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  TravelHistory = Constants.travelHistory;
  Settings = Constants.settings;
  Weather = Constants.weather;
  AllUsers = Constants.allUsers;
  AllDrivers = Constants.allDrivers;
  AllTravelHistory = Constants.allTravelHistory;
  Dashboard = Constants.dashboard;
  Logout = Constants.logout;
  ThemeSettings = Constants.themeSettings;

  currentCompany: any;
  arrCompany: any = [];
  errorMessage: any;
  showErrorMessage = false;
  selectedCompany: any;
  currentLanguage: string;
  currentLanguageId: string;
  currentLanguageName: string;
  arrLanguage: any = [];
  userName: any;
  headerValues: any;
  admin: boolean = false;
  userType: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private getScreenDetailService: GetScreenDetailService,
    private commonServices: CommonServices

  ) {
    if (localStorage.getItem('currentUser')) {
      var userData = JSON.parse(localStorage.getItem('currentUser'));
      if (userData.email) {
        if (userData.email == 'admin@gmail.com') {
          this.admin = true;
        } else {
          this.admin = false;
          this.userType = userData.driver;
        }
      }
    }
  }

  ngOnInit() {
    this.getCompanyList();
    this.getLanguage();
    this.getUserName();
  }

  getLanguage() {
    const currentLanguageId = localStorage.getItem('currentLanguage');
    this.arrLanguage = [{
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

    this.currentLanguageName = localStorage.getItem('currentLanguageName') ? localStorage.getItem('currentLanguageName') : this.arrLanguage.find(x => x.languageId == currentLanguageId).languageName;
  }

  getUserName() {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse((localStorage.getItem('currentUser') as any));
      this.userName = user.firstName + ' ' + user.lastName;
    }

  }

  ChangeLanguage(lng) {

    this.currentLanguageId = lng.languageId;
    localStorage.setItem('currentLanguage', lng.languageId);

    this.currentLanguageName = lng.languageName;
    localStorage.setItem('currentLanguageName', this.currentLanguageName);
    window.location.reload();
    if (this.currentLanguageId == '1') {
      localStorage.setItem('languageOrientation', 'LTR');
    } else {
      localStorage.setItem('languageOrientation', 'RTL');
    }

    // this.getScreenDetailService.getHeaderDetail().subscribe(data => {

    //   if (data.btiMessage.messageShort != 'FORBIDDEN') {
    //     this.headerValues = data.result;
    //   }

    // }, err => {

    //   console.log(err);
    // }, () => {

    //   this.getScreenDetailService.getLanguageById(this.currentLanguageId).subscribe(data => {
    //     this.changeSidebar(data);
    //   });

    // });

  }

  changeSidebar(data) {

    const languageOrientation = data.result.languageOrientation;
    localStorage.setItem('languageOrientation', languageOrientation);

    if (languageOrientation == 'LTR') {

      let currentEnglishModule = localStorage.getItem('currentEnglishModule');
      localStorage.setItem('currentModule', currentEnglishModule);


      let module = this.headerValues.find(x => x.moduleId == Number(currentEnglishModule));

      let sidebar = module.screenCategoryList;
      localStorage.setItem("SidebarMenus", JSON.stringify(sidebar));
    }

    if (languageOrientation == 'RTL') {

      let currentArabicModule = localStorage.getItem('currentArabicModule');
      localStorage.setItem('currentModule', currentArabicModule);

      let module = this.headerValues.find(x => x.moduleId == Number(currentArabicModule));

      let sidebar = module.screenCategoryList;
      localStorage.setItem("SidebarMenus", JSON.stringify(sidebar));
    }

    window.location.reload();
  }

  getCompanyList() {
    this.arrCompany = [{
      companyCode: "erp_bti_algoras",
      companyId: 2,
      name: "BAAN For Technology Int",
      tenantId: "erp_bti_algoras",
    }];
    this.currentCompany = localStorage.getItem('currentCompany') ? localStorage.getItem('currentCompany') : (this.arrCompany.find(x => x.companyId == localStorage.getItem('companyId')).name);


  }

  navigateToModulesScreen() {
    this.router.navigate(['/weather']);
  }


  logOut() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    this.commonServices.logOut(userData.email).then(data => {
      if (data.result == '1') {
        Utils.notification('logout successfully', 'success');
        localStorage.clear();
        localStorage.setItem('currentLanguage', data.currentLanguage);
        localStorage.setItem('languageOrientation', data.languageOrientation);
        localStorage.setItem('currentLanguageName', data.currentLanguageName);

        // localStorage.setItem('currentUser', '');
        this.router.navigate(['login']);
      } else {
        Utils.notification('internal server error', 'error');
      }

    });
  }
}
