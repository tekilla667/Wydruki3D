import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterEmailconfirmComponent } from './register-emailconfirm/register-emailconfirm.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'emailconfirm', component: RegisterEmailconfirmComponent},
  {path: 'settings', component: UserSettingsComponent},
  {path: 'orders', component: UserOrdersComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
