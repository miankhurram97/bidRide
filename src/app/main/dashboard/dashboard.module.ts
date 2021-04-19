import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { MatAutocompleteModule, MatSelectModule, MatIconModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSnackBarModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmDirectionModule } from 'agm-direction';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxLoadingModule } from 'ngx-loading';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      // apiKey : 'AIzaSyArBa8vyHFIwlMzpkJVAtot_Z0bn1Oidy',
      apiKey: 'AIzaSyASP_B-WHbqF6sPqL5n2t2vGbmN8OzLsfQ',
      libraries: ['places']

    }),
    AgmDirectionModule,
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
    GooglePlaceModule,
    MatCardModule,
    MatSnackBarModule,
    NgxMaterialTimepickerModule,
    NgxLoadingModule.forRoot({})
  ],
})
export class DashboardModule { }
