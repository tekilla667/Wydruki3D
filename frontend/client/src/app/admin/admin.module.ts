import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminCustomersComponent } from './admin-customers/admin-customers.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminDeliveryComponent } from './admin-delivery/admin-delivery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLoginComponent } from './admin-login/admin-login.component';


@NgModule({
  declarations: [AdminComponent, AdminProductsComponent, AdminOrdersComponent,
     AdminCustomersComponent, AdminReportComponent, AdminDeliveryComponent, AdminLoginComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    NgbModule
  ],
  exports: [AdminComponent,  AdminProductsComponent, AdminOrdersComponent,
    AdminCustomersComponent, AdminReportComponent, AdminDeliveryComponent, AdminLoginComponent, ToastrModule]
})
export class AdminModule { }
