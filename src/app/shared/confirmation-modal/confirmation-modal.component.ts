declare const $: any;
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constants } from 'src/app/_sharedresources/Constants';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  confirmationModalTitle = Constants.confirmationModalTitle;
  confirmationModalBody = Constants.confirmationModalBody;
  deleteConfirmationText = Constants.deleteConfirmationText;
  OkText = Constants.OkText;
  CancelText = Constants.CancelText;
  isDeleteAction: boolean = false;

  @Output() deleteEvent = new EventEmitter();
  sum = 0;
  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    $('#confirmation-modal').modal('hide');
  }

  sendBack() {
    this.sum = this.sum + 10;
    this.deleteEvent.emit({ name: 'Back.! ' + this.sum });
  }

}
