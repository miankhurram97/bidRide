import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllDriversRoutingModule } from './all-drivers-routing.module';
import { AllDriversComponent } from './all-drivers/all-drivers.component';
import { MatAutocompleteModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';


@NgModule({
  declarations: [AllDriversComponent],
  imports: [
    CommonModule,
    AllDriversRoutingModule,
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
export class AllDriversModule { }
