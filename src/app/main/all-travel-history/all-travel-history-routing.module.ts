import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTravelHistoryComponent } from './all-travel-history/all-travel-history.component';


const routes: Routes = [
  {
    path: '',
    component: AllTravelHistoryComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllTravelHistoryRoutingModule { }
