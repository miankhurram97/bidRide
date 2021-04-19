import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBiddingsComponent } from './all-biddings/all-biddings.component';


const routes: Routes = [
  {
    path: '',
    component: AllBiddingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiddingRoutingModule { }
