import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllDriversComponent } from './all-drivers/all-drivers.component';


const routes: Routes = [
  {
    path: '',
    component: AllDriversComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllDriversRoutingModule { }
