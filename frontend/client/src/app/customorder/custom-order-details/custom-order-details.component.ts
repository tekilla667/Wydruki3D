import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { StlModelViewerComponent } from 'angular-stl-model-viewer';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { ICustomOrder } from 'src/app/shared/Models/CustomOrder';
import { IFilaments } from 'src/app/shared/Models/Filaments';
import { IModelToken } from 'src/app/shared/Models/modelToken';
import { IProduct } from 'src/app/shared/Models/product';
import * as THREE from 'three';
import { CustomOrderService } from '../custom-order.service';

@Component({
  selector: 'app-custom-order-details',
  templateUrl: './custom-order-details.component.html',
  styleUrls: ['./custom-order-details.component.scss']
})
export class CustomOrderDetailsComponent implements OnInit, OnDestroy {
  queryString: string;
  productName: string;
  product: IProduct;
  quantity = 1;
  radios = [];
  filamentradios = [];
  filaments = new BehaviorSubject<IFilaments[]>(null);
  filaments$ = this.filaments.asObservable();
  price = new BehaviorSubject<number>(null);
  currentPrice: number;
  price$ = this.price.asObservable();
  tempMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 10, specular: 0x111111 });
  materialSource = new BehaviorSubject<THREE.MeshPhongMaterial>(null);
  material$ = this.materialSource.asObservable();
  fillamentId: number;
  fillamentPercent = 50;
  constructor(private customOrderService: CustomOrderService, private basketService: BasketService, private toastrService: ToastrService) {
    this.productName = localStorage.getItem('modelName');
    this.fillamentId = 1;
   }

  ngOnInit(): void {
    this.queryString = 'https://localhost:5001/models?modelToken=' +
    localStorage.getItem('modelToken') + '&id=' + localStorage.getItem('id');
    console.log(this.queryString);
    this.customOrderService.getFilaments().subscribe((fm: IFilaments[]) => {
      this.filaments.next(fm);
    });
    for (let i = 1 ; i <= 4 ; i++)
    {
      this.radios.push(document.getElementById('flexRadioDefault' + i.toString()));
    }
    for (let i = 1 ; i <= 4 ; i++)
    {
      this.filamentradios.push(document.getElementById('filament' + i.toString()));
    }

    if (!localStorage.getItem('color'))
    {
      localStorage.setItem('color', '1');
    }
    if (!localStorage.getItem('filamentSelected'))
    {
      localStorage.setItem('filamentSelected', '1');
    }
    if(!localStorage.getItem('filamentPercent'))
    {
      localStorage.setItem('filamentPercent', '50');
    }
    this.filamentradios[parseInt(localStorage.getItem('filamentSelected'),10) - 1].checked = true;
    this.radios[parseInt(localStorage.getItem('color'), 10) - 1].checked = true;
    document.getElementById('customRange3')["value"] = parseInt(localStorage.getItem('filamentPercent'), 10);
    this.updateColor();
    this.fillamentId = parseInt(localStorage.getItem('filamentSelected'), 10);
    this.fillamentPercent = document.getElementById('customRange3')["value"];
    this.getPrice();
  }
  getProduct(id: number){

  }
  getPrice(){
    this.customOrderService.getPrice(this.fillamentId, this.fillamentPercent / 100).subscribe((price: number) => {
      this.price.next(price);
      this.currentPrice = price;
    });
  }

getColorIndex(){
  let color = 0;
  for (let i = 0 ; i <= 3 ; i++)
  {
    if (this.radios[i].checked)
        {
          color = i + 1;
        }
  }
  localStorage.setItem('color', color.toString());
  console.log(color);
  this.updateColor();
  this.reload();
}
assignActiveFilament(id: number){
  this.fillamentId = id + 1;
  localStorage.removeItem('filamentSelected');
  localStorage.setItem('filamentSelected', (id+1).toString());
  this.getPrice();
}
private updateColor(){
  switch (localStorage.getItem('color')){
    case '1':
      this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess: 10, specular: 0x111111 }));
      break;
    case '2':
      this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0x008000, shininess: 10, specular: 0x111111 }));
      break;
    case '3':
      this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0x0000FF, shininess: 10, specular: 0x111111 }));
      break;
    case '4':
      this.materialSource.next(new THREE.MeshPhongMaterial({ color: 0xFFA500, shininess: 10, specular: 0x111111 }));
      break;
  }
}
 fillamentChange(){
 this.fillamentPercent = document.getElementById('customRange3')["value"];
 localStorage.setItem('filamentPercent', this.fillamentPercent.toString());
 this.getPrice();
  }
  private reload(){
    location.reload();
  }
  increment(){
    this.quantity++;
  }
  decrement(){
    if (!(this.quantity < 2))
    {
       this.quantity--;
    }
  }
  addToBasket(){
    const customOrderItem: ICustomOrder = {
      usersId: localStorage.getItem('id'),
      modelName: localStorage.getItem('modelId'),
      quantity: this.quantity,
      filamentId: this.fillamentId,
      filingPercent: parseInt(localStorage.getItem('filamentPercent'), 10),
      colorId: parseInt(localStorage.getItem('color'), 10),
      price: this.currentPrice
    };
    this.basketService.addCustomOrderToBasket(customOrderItem);
    this.toastrService.success('Dodano zamowienie wlasne', 'Koszyk');
  }
  ngOnDestroy(): void {
    localStorage.removeItem('modelId');
    localStorage.removeItem('modelToken');
    localStorage.removeItem('id');
    localStorage.removeItem('filamentSelected');
    localStorage.removeItem('color');
  }

}

