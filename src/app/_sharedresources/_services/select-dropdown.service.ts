import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectDropdownService {
  singleSelectSetting: any;
  multiSelectSetting: any;
  singleSelectSettingDisable: any;
  multiSelectSettingDisable: any;
  lazyLoadSingleSelect: any;
  lazyLoadMultiSelect: any;

  constructor() {
    this.singleSelectSetting = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

    this.lazyLoadSingleSelect = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      lazyLoading: true
    };

    this.lazyLoadMultiSelect = {
      singleSelection: false,
      text: '',
      selectAllText: '',
      unSelectAllText: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      lazyLoading: true
    };

    this.singleSelectSettingDisable = {
      singleSelection: true,
      text: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      disabled: true
    };

    this.multiSelectSetting = {
      singleSelection: false,
      text: '',
      enableSearchFilter: true,
      classes: "myclass custom-class",
      badgeShowLimit: 2
    };

    this.multiSelectSettingDisable = {
      singleSelection: false,
      text: '',
      selectAllText: '',
      unSelectAllText: '',
      enableSearchFilter: true,
      classes: 'myclass custom-class',
      lazyLoading: true,
      disabled: true
    };
  }
}
