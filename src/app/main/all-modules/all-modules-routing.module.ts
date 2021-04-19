import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllModulesComponent } from './all-modules.component';


const routes: Routes = [
  {
    path: '',
    component: AllModulesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
