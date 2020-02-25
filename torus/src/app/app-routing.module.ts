import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const route: Routes = [

  {
    path: '',
    pathMatch: 'full',
    loadChildren: './home/home.module#HomeModule'
  },
  
  {
    path: 'dashboard',
    pathMatch: 'full',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }