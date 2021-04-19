declare const $: any;
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GetScreenDetailService } from 'src/app/_sharedresources/_services/get-screen-detail.service';
import { Router } from '@angular/router';
import { Constants } from 'src/app/_sharedresources/Constants';
declare function initSidebar(): any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  Dashboard = Constants.dashboard;
  TravelHistory = Constants.travelHistory;
  Settings = Constants.settings;
  Weather = Constants.weather;
  AllUsers = Constants.allUsers;
  AllDrivers = Constants.allDrivers;
  AllTravelHistory = Constants.allTravelHistory;
  ThemeSettings = Constants.themeSettings;
  currentModule: any;
  sideMenuItems: any;
  currentCompany: any;
  currentLanguage: any;
  currentLanguageName: any;
  loggedInUserRole: any;
  sideMenus: any;

  screenCategoryName: any;
  completeSideMenu: any = [];
  isSubMenuItem = false;
  innerHeight: any;
  windowWidth: any;

  deviceType = 'desktop';
  verticalNavType = 'expanded';
  verticalEffect = 'shrink';
  userType: boolean = false;
  admin: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: any,
    private getScreenDetailService: GetScreenDetailService,
    private router: Router
  ) {
    // this.currentModule = localStorage.getItem('currentModule');
    // this.sideMenuItems = localStorage.getItem("SidebarMenus");
    // this.currentCompany = localStorage.getItem("currentCompany");
    this.currentLanguage = localStorage.getItem('currentLanguage') ?
      localStorage.getItem('currentLanguage') : "1";
    if (localStorage.getItem('currentUser')) {
      var userData = JSON.parse(localStorage.getItem('currentUser'));
      if (userData.email) {
        if (userData.email == 'admin@gmail.com') {
          this.admin = true;
        } else {
          this.admin = false;
          this.userType = userData.driver;
        }
      } else {
        this.router.navigate(['login']);
      }
    }
    // this.currentLanguageName = localStorage.getItem('currentLanguageName');
    // var userData = JSON.parse(localStorage.getItem('currentUser'));
    // if (userData != null) {
    //   this.loggedInUserRole = userData.role;
    // }
    // this.getSidebarDetail();
  }

  ngOnInit() {
    initSidebar();
    if (this.currentLanguage == '2') {
      this.document.getElementById('pcoded').setAttribute('vertical-placement', 'right');
    }
    else {
      this.document.getElementById('pcoded').setAttribute('vertical-placement', 'left');
    }
    this.slidelink()
  }


  getSidebarDetail() {
    // if (this.currentModule) {
    //   if (this.currentModule != 2 && this.currentModule != 21 && this.currentModule != 99 && this.currentModule != 100) {
    //     this.getScreenDetailService.getSideBarDetail(this.currentModule).subscribe(data => {
    //       if (data.result) {
    //         this.sideMenuItems = data.result[0];
    //         this.sideMenus = this.sideMenuItems.sideMenuList;
    //       }
    //     });
    //   }
    //   if (this.currentModule == 2 || this.currentModule == 21) {
    //     if (this.sideMenuItems != "" && this.sideMenuItems != "undefined") {
    //       this.sideMenus = JSON.parse(localStorage.getItem("SidebarMenus"));
    //     }
    //   } else if (this.currentModule == 12 || this.currentModule == 14) {
    //     if (this.sideMenuItems != "" && this.sideMenuItems != "undefined") {
    //       this.sideMenus = JSON.parse(localStorage.getItem("SidebarMenus"));
    //       this.screenCategoryName = this.sideMenus[0].screenCategoryName;
    //       this.completeSideMenu = this.sideMenus[0].sideMenuList;
    //     }
    //   }
    //   if (this.currentModule == 99 || this.currentModule == 100) {
    //     if (this.sideMenuItems != "" && this.sideMenuItems != "undefined") {
    //       this.sideMenus = JSON.parse(localStorage.getItem("SidebarMenus"));
    //     }
    //   }

    // }

  }

  addClass(className) {
    $('#' + className).toggleClass('pcoded-trigger').siblings().removeClass('pcoded-trigger');
  }

  slidelink() {
    $().ready(function () {
      $('ul.pcoded-left-item').find('li.active').addClass('pcoded-trigger');
    });
  }

  stableSidebar() {
    setTimeout(() => {
      $('#test1').removeClass('pcoded-trigger').addClass('pcoded-trigger');
      return false;
    }, 5);

  }
}
