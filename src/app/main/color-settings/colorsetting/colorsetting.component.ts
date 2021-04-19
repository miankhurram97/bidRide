import { Component, OnInit, Inject } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { NgForm } from '@angular/forms';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Utils } from 'src/app/utils';
declare const $: any;

@Component({
  selector: 'app-colorsetting',
  templateUrl: './colorsetting.component.html',
  styleUrls: ['./colorsetting.component.scss']
})
export class ColorsettingComponent implements OnInit {
  save = Constants.save;
  ThemeSettings = Constants.themeSettings;
  cancel = Constants.btnCancelText;
  confirmationModalTitle = Constants.confirmationModalTitle;
  confirmationModalBody = Constants.confirmationModalBody;
  OkText = Constants.OkText;
  CancelText = Constants.CancelText;
  model: any = {
    mainColor: '#81663B',
    mainColorHover: '#482E04',
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
  }

  imageFrmt = false;
  sizeLimit = false;
  checkSize: any;
  size: any;
  uploadedImage: File;
  signatureType: any;
  image: any = 'assets/images/logo.png';

  uploadAttachfile;
  selectedImage;

  width: number;
  height: number;
  resetTrue: boolean = false;
  that: any;
  constructor(public commonService: CommonServices,
    public router: Router,
    public sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.getColorSetting();
  }

  closeModal() {
    $('#confirmation-modal').modal('hide');
    this.getColorSetting();
  }

  changeColor(event, fieldType) {
    if (fieldType == 'mainColor') {
      this.document.documentElement.style.setProperty('--main-color', event)
    }
    if (fieldType == 'mainColorHover') {
      this.document.documentElement.style.setProperty('--main-color-hover', event)
    }
    if (fieldType == 'sideBar') {
      this.document.documentElement.style.setProperty('--side-bar', event)
    }
    if (fieldType == 'btnSuccess') {
      this.document.documentElement.style.setProperty('--btnSuccess', event)
    }
    if (fieldType == 'btnSuccessHover') {
      this.document.documentElement.style.setProperty('--btnSuccessHover', event)
    }
    if (fieldType == 'btnWarning') {
      this.document.documentElement.style.setProperty('--btnWarning', event)
    }
    if (fieldType == 'btnWarningHover') {
      this.document.documentElement.style.setProperty('--btnWarningHover', event)
    }
    if (fieldType == 'btnGreen') {
      this.document.documentElement.style.setProperty('--btnGreen', event)
    }
    if (fieldType == 'btnGreenHover') {
      this.document.documentElement.style.setProperty('--btnGreenHover', event)
    }
    if (fieldType == 'btnInfo') {
      this.document.documentElement.style.setProperty('--btnInfo', event)
    }
    if (fieldType == 'btnInfoHover') {
      this.document.documentElement.style.setProperty('--btnInfoHover', event)
    }
    if (fieldType == 'btnDanger') {
      this.document.documentElement.style.setProperty('--btnDanger', event)
    }
    if (fieldType == 'btnDangerHover') {
      this.document.documentElement.style.setProperty('--btnDangerHover', event)
    }
    if (fieldType == 'btnPrimary') {
      this.document.documentElement.style.setProperty('--btnPrimary', event)
    }
    if (fieldType == 'btnPrimaryHover') {
      this.document.documentElement.style.setProperty('--btnPrimaryHover', event)
    }
  }


  create(f: NgForm) {
    
    this.setColors(this.model);
    Utils.notification('settings save successfully','success');
  }

  getColorSetting() {
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
    this.setColors(this.model)
  }


  resetColorSetting() {
    this.selectedImage = null;
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
    this.setColors(this.model);
    this.resetTrue = true;
    $('#confirmation-modal').modal('show');
  }

  setColors(model) {
    this.document.documentElement.style.setProperty('--main-color', model.mainColor);
    this.document.documentElement.style.setProperty('--main-color-hover', model.mainColorHover);
    this.document.documentElement.style.setProperty('--side-bar', model.sideBar);
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
    this.document.documentElement.style.setProperty('--btnPimary', model.btnPimary);
    this.document.documentElement.style.setProperty('--btnPrimaryHover', model.btnPrimaryHover);
  }

  saveSettings(f: NgForm) {
    this.create(f);
    $('#confirmation-modal').modal('hide');
  }
}
