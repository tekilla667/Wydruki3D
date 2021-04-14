import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminDeliveryComponent } from './admin-delivery/admin-delivery.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {path: 'administratordashboard', component: AdminComponent},
  {path: 'administratordeliveries', component: AdminDeliveryComponent},
  {path: 'administratorcustomers', component: AdminCustomersComponent},
  {path: 'administratorproducts', component: AdminProductsComponent},
  {path: 'administratorreports', component: AdminReportComponent},
  {path: 'administratororders', component: AdminOrdersComponent},
  {path: '', component: AdminLoginComponent}
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
export class AdminRoutingModule { }
