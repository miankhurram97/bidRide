import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllTravelHistoryRoutingModule } from './all-travel-history-routing.module';
import { AllTravelHistoryComponent } from './all-travel-history/all-travel-history.component';
import { MatAutocompleteModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
  declarations: [AllTravelHistoryComponent],
  imports: [
    CommonModule,
    AllTravelHistoryRoutingModule,
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
export class AllTravelHistoryModule { }
