import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { CustomOrderDetailsComponent } from './custom-order-details/custom-order-details.component';

const routes: Routes = [
  {path: '', component: CustomOrderComponent},
  {path: ':details', component: CustomOrderDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CustomOrderRoutingModule { }
