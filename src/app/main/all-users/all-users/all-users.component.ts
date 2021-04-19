import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';
import { Page } from 'src/app/_sharedresources/page';
import { CommonServices } from 'src/app/_sharedresources/_services/common.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  AllUsers = Constants.allUsers;
  Name = Constants.firstName;
  Email = Constants.email;
  Phone = Constants.phone;
  Active = Constants.active;
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
    
    this.commonService.getAllUsers(requestBody).then(data => {
      if (data.length) {
        this.rows = [];
        data.forEach(e => {
          this.rows.push({
            email:e.user_email,
            name:e.user_firstname+' '+e.user_lastname,
            phone:e.user_phone,
            active:e.active == 0?false:true,
          })
        });
      } else {
        this.rows = [];
        // Utils.notification('no ride found', 'error');
      }
    })
  }

  toDelete() { }

}
