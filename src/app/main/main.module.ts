import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainViewComponent } from './main-view.component';
import { LayoutModule } from '../layout/layout.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepicker } from '@angular/material/datepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainViewComponent,],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgxDatatableModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularMultiSelectModule,
    HttpClientModule,
  ]
})
export class MainModule { }
