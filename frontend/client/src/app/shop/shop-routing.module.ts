import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';
import { StoreProductDetailsComponent } from './store-product-details/store-product-details.component';

const routes: Routes = [
  {path: '', component: ShopComponent},
  {path: ':id', component: StoreProductDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
