import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorSettingsRoutingModule } from './color-settings-routing.module';
import { ColorsettingComponent } from './colorsetting/colorsetting.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [ColorsettingComponent],
  imports: [
    CommonModule,
    ColorSettingsRoutingModule,
    NgxDatatableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    SharedModule,
  ]
})
export class ColorSettingsModule { }
