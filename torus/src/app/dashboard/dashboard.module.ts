import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms'
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    NgxQRCodeModule
  ],
  entryComponents:[
    
  ],
  bootstrap:[
    
  ]
})
export class DashboardModule { }
