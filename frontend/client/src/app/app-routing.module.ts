import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
 {path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule)},
 {path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule)},
 {path: 'store', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path: 'checkout',
   canActivate: [AuthorizationGuard],
  loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule)},
{path: 'customorder', canActivate: [AuthorizationGuard],
loadChildren: () => import('./customorder/custom-order.module').then(mod => mod.CustomOrderModule)},
{path: 'admin', canActivate: [AuthorizationGuard], loadChildren: () => import ('./admin/admin.module').then(mod => mod.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
