import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {
  delete = Constants.delete;
  ddPageSize = 5;
  tableViewtext = Constants.tableViewtext;

  @Input() page: any;
  @Input() isDeleteShow: boolean = true;
  @Input() selected: any;
  @Output() changePageSizeEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  /**
   * To change page size
   * @param event 
   */
  changePageSize(event) {
    this.changePageSizeEvent.emit(event);
  }

}
