import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { Page } from 'src/app/_sharedresources/page';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';

@Component({
  selector: 'app-all-biddings',
  templateUrl: './all-biddings.component.html',
  styleUrls: ['./all-biddings.component.scss']
})
export class AllBiddingsComponent implements OnInit {

  search = Constants.search;
  currentLanguage: any;
  moduleCode = 'M-1011';
  screenCode = 'S-1098';
  defaultManageFormValues = [];
  page = new Page();
  rows = [];
  selected = [];
  searchKeyword = '';
  constructor(
    public commonService: CommonServices
  ) {
    this.page.pageNumber = 0;
    this.page.size = 5;
  }

  ngOnInit() {
    this.getRideBiddingRequests();
  }
  getRideBiddingRequests() {
    this.commonService.getBiddingsRequestForDrivers().then(data => {
      if (data.length) {
        this.rows = [];
        data.forEach(e => {
          this.rows.push({
            biddingTime: e.bidding_time,
            createdAt: e.created_at,
            distance: e.distance,
            dropLat: e.drop_lat,
            dropLng: e.drop_lng,
            dropOffLocation: e.drop_location,
            duration: e.duration,
            estimatedPrice: e.estimated_price,
            id: e.id,
            isDeleted: e.isDeleted,
            pickLat: e.pick_lat,
            pickLng: e.pick_lng,
            pickupLocation: e.pick_location,
            rideOptionId: e.ride_option_id,
            rideOption: e.ride_option_name,
            userId: e.user_id,
          })
        });
      }
    })
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'click') {
      if (event.row) {
        console.log(event.row);
      }
    }
  }

  // search department by keyword
  updateFilter(event) {
    this.searchKeyword = event.target.value.toLowerCase();
    this.page.pageNumber = 0;
    setTimeout(() => {
      // this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy }, 'search');
    }, 500);

  }
  // Set default page size
  changePageSize(event) {
    this.page.size = event;
    // this.setPage({ offset: 0, sortOn: this.page.sortOn, sortBy: this.page.sortBy });
  }

  setPage(event) { }
}
