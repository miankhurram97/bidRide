import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view.component';


const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'themeSettings',
        loadChildren: () => import('./color-settings/color-settings.module').then(m => m.ColorSettingsModule)
      },
      {
        path: 'weather',
        loadChildren: () => import('./all-modules/all-modules.module').then(m => m.AllModulesModule)
      },
      {
        path: 'travelHistory',
        loadChildren: () => import('./travel-history/travel-history.module').then(m => m.TravelHistoryModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'bidding',
        loadChildren: () => import('./bidding/bidding.module').then(m => m.BiddingModule)
      },
      {
        path: 'allUsers',
        loadChildren: () => import('./all-users/all-users.module').then(m => m.AllUsersModule)
      },
      {
        path: 'allDrivers',
        loadChildren: () => import('./all-drivers/all-drivers.module').then(m => m.AllDriversModule)
      },
      {
        path: 'allTravelHistory',
        loadChildren: () => import('./all-travel-history/all-travel-history.module').then(m => m.AllTravelHistoryModule)
      },

      /**
       * Financial Module
       *
      /**
       * Inventory Module
       */

      /**
       * HCM Small Modules with components 
       */

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
