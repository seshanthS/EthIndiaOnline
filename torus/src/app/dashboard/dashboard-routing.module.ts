import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const route: Routes = [
  {
    path: '',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }