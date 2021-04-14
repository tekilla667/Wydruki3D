import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StlModelViewerComponent } from 'angular-stl-model-viewer';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/Models/product';
import * as THREE from 'three';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-store-product-details',
  templateUrl: './store-product-details.component.html',
  styleUrls: ['./store-product-details.component.scss']
})
export class StoreProductDetailsComponent implements OnInit{
  product: IProduct;
  quantity = 1;
  radios = [];
  tempMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 10, specular: 0x111111 });
  materialSource = new BehaviorSubject<THREE.MeshPhongMaterial>(null);
  material$ = this.materialSource.asObservable();
  fillamentPercent = 50;
  constructor(private shopservice: ShopService, private activateRoute: ActivatedRoute, private basketService: BasketService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProduct(+this.activateRoute.snapshot.paramMap.get('id'));
    // for (let i = 1 ; i <= 4 ; i++)
    // {
    //   this.radios.push(document.getElementById('flexRadioDefault' + i.toString()));
    // }
    // if (!localStorage.getItem('color'))
    // {
    //   localStorage.setItem('color', '1');
    // }
    // this.radios[parseInt(localStorage.getItem('color'), 10) - 1].checked = true;
    // this.updateColor();
  }

  getProduct(id: number){
      this.shopservice.getProductById(id).subscribe(product => {
      this.product = product;
    });
  }
  // getColorIndex(){
  //   let color = 0;
  //   for (let i = 0 ; i <= 3 ; i++)
  //   {
  //     if (this.radios[i].checked)
  //         {
  //           color = i + 1;
  //         }
  //   }
  //   localStorage.setItem('color', color.toString());
  //   console.log(color);
  //   this.updateColor();
  //   this.reload();
  // }
  // private updateColor(){
  //   switch (localStorage.getItem('color')){
  //     case '1':
  //       this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 10, specular: 0x111111 }));
  //       break;
  //     case '2':
  //       this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0x008000, shininess: 10, specular: 0x111111 }));
  //       break;
  //     case '3':
  //       this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0x0000FF, shininess: 10, specular: 0x111111 }));
  //       break;
  //     case '4':
  //       this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0xFFA500, shininess: 10, specular: 0x111111 }));
  //       break;
  //   }
  // }
  //  fillamentChange(){
  //  this.fillamentPercent = document.getElementById('customRange3')["value"];
  //   }
  //   private reload(){
  //     location.reload();
  //   }
    increment(){
      this.quantity++;
    }
    decrement(){
      if (this.quantity > 1)
      {
        this.quantity--;
      }
    }
    addToBasket(){
      this.basketService.addItemToBasket(this.product, this.quantity);
      this.toastr.success('Dodano nowy produkt', 'Koszyk');
    }

}
