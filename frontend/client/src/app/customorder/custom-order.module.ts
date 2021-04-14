import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { CustomOrderRoutingModule } from './custom-order-routing.module';
import { CustomOrderDetailsComponent } from './custom-order-details/custom-order-details.component';
import { RouterModule } from '@angular/router';
import { StlModelViewerModule } from 'angular-stl-model-viewer';



@NgModule({
  declarations: [CustomOrderComponent, CustomOrderDetailsComponent],
  imports: [
    CommonModule,
    CustomOrderRoutingModule,
    RouterModule,
    StlModelViewerModule
  ]
})
export class CustomOrderModule { }
