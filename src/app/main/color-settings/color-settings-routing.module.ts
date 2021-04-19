import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsettingComponent } from './colorsetting/colorsetting.component';


const routes: Routes = [{
  path:'',
  component: ColorsettingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorSettingsRoutingModule { }
