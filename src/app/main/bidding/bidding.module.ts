import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiddingRoutingModule } from './bidding-routing.module';
import { AllBiddingsComponent } from './all-biddings/all-biddings.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AllBiddingsComponent],
  imports: [
    CommonModule,
    BiddingRoutingModule,
    AngularMultiSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    MatIconModule,
    MatSelectModule,
    SharedModule,
    MatAutocompleteModule,
  ]
})
export class BiddingModule { }
