import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatIconModule, MatSelectModule } from '@angular/material';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableFooterComponent } from './table-footer/table-footer.component';




@NgModule({
  declarations: [
    ConfirmationModalComponent,TableFooterComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [
    TableFooterComponent,
    ConfirmationModalComponent,
  ]
})
export class SharedModule { }
