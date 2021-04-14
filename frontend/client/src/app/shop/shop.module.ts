import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { StoreItemComponent } from './store-item/store-item.component';
import { StoreProductDetailsComponent } from './store-product-details/store-product-details.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';
import { ShopRoutingModule } from './shop-routing.module';
import { StlModelViewerModule } from 'angular-stl-model-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ShopComponent, StoreItemComponent, StoreProductDetailsComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    StlModelViewerModule,
    ReactiveFormsModule
  ],
  exports: [ShopComponent, StoreItemComponent, ToastrModule,
    ]
})
export class ShopModule { }
