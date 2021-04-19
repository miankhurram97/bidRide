import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelhistoryComponent } from './travelhistory/travelhistory.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TravelhistoryComponent
  },
];
@NgModule({
  declarations: [TravelhistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
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
export class TravelHistoryModule { }
