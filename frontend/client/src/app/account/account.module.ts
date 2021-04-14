import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterEmailconfirmComponent } from './register-emailconfirm/register-emailconfirm.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterEmailconfirmComponent, UserSettingsComponent, UserOrdersComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule
  ],
  exports: [LoginComponent, RegisterComponent, RegisterEmailconfirmComponent, UserSettingsComponent, UserOrdersComponent]
})
export class AccountModule { }
