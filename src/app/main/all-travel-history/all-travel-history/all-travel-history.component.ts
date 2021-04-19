import { Component, OnInit } from '@angular/core';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';
import { Page } from 'src/app/_sharedresources/page';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-all-travel-history',
  templateUrl: './all-travel-history.component.html',
  styleUrls: ['./all-travel-history.component.scss']
})
export class AllTravelHistoryComponent implements OnInit {
  TravelHistory = Constants.allTravelHistory;
  PickOff = Constants.PICKOff;
  UserId = Constants.userId;
  DriverId = Constants.driverId;
  dropoff = Constants.dropoff;
  Distance = Constants.distance;
  RideOptions = Constants.rideOptions;
  Estimated = Constants.estimated;
  EstimatedPrice = Constants.estimatedPrice;
  RidePrice = Constants.RidePrice;
  search = Constants.search;
  currentLanguage: any;
  moduleCode = 'M-1011';
  screenCode = 'S-1098';
  defaultManageFormValues = [];
  page = new Page();
  rows = [];
  selected = [];
  searchKeyword = '';
  constructor(public commonService: CommonServices) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.getUserRideData()
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  edit1(event) { }

  // search department by keyword
  updateFilter(event) {
    this.searchKeyword = event.target.value.toLowerCase();
    setTimeout(() => {
      this.getUserRideData(this.searchKeyword)
    }, 500);

  }
  // Set default page size
  changePageSize(event) {
    this.page.size = event;
    // this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
  }

  setPage(event) { }

  getUserRideData(searchkeywords?) {
    var info = JSON.parse(localStorage.getItem('currentUser'));
    const requestBody: any = {
    }
    if (searchkeywords != '') {
      requestBody.searchKeywords = searchkeywords;
    }
    if (info.driver) {
      requestBody.driverId = info.userId;
    } else {
      requestBody.userId = info.userId;
    }
    this.commonService.getAllTravelHistory(requestBody).then(data => {
      if (data.length) {
        this.rows = [];
        this.rows = data;
      } else {
        this.rows = [];
        // Utils.notification('no ride found', 'error');
      }
    })
  }

  toDelete() { }

}
