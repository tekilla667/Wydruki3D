import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, BasketValue, IBasket, IBasketItem, IBasketValue } from '../shared/Models/basket';
import { ICustomOrder } from '../shared/Models/CustomOrder';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { IProduct } from '../shared/Models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = environment.ApiUrl;
  basketSource = new BehaviorSubject<IBasket>(null);
  basketValue = new BehaviorSubject<IBasketValue>(null);
  delivery = new BehaviorSubject<IDeliveryMethod>(null);
  basket$ = this.basketSource.asObservable();
  delivery$ = this.delivery.asObservable();
  basketValue$ = this.basketValue.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
    .pipe(
      map((basket: IBasket) => {
      this.basketSource.next(basket);
      this.updatePriceTotal();
      })
    );
  }
  setDelivery(delivery: IDeliveryMethod){
    this.delivery.next(delivery);
  }

  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) => {
      this.basketSource.next(response);
      this.updatePriceTotal();
      console.log(this.basketSource.value);
    }, error => {
      console.log(error);
    });
  }
  getBaskePrice(){
    let value: number;
    this.basketSource.value.basketItems.forEach(element => {
      value += element.price * element.quantity;
    });
    this.basketSource.value.customOrderItems.forEach(element => {
      value += element.price * element.quantity;
    });

    return value;
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  getBasketItems(){
    return this.basketSource.value.basketItems;
  }
  getCurrentBasketItemsCount(){
    return this.basketSource.value.basketItems.length;
  }
  addItemToBasket(item: IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.mapProdToItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.basketItems = this.checkItemExists(basket.basketItems, itemToAdd, quantity);
    this.setBasket(basket);
    console.log(this.basketValue.value.price);
  }
  addCustomOrderToBasket(item: ICustomOrder){
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    console.log(basket);
    basket.customOrderItems.push(item);
    this.setBasket(basket);
    console.log(basket);
  }
incrementItem(item: IBasketItem){
  const basket = this.getCurrentBasketValue();
  const index = basket.basketItems.findIndex(i => i.id === item.id);
  if (index === -1){
      return;
    }
    else {
      basket.basketItems[index].quantity += 1;
    }
  this.setBasket(basket);
}
decrementItem(item: IBasketItem){
  const basket = this.getCurrentBasketValue();
  const index = basket.basketItems.findIndex(i => i.id === item.id);
  if (index === -1){
      return;
    }
    else {
      basket.basketItems[index].quantity -= 1;
      if (basket.basketItems[index].quantity === 0)
      {
        basket.basketItems.splice(index, 1);
      }
    }
  this.setBasket(basket);
}
removeItem(item: IBasketItem){
  const basket = this.getCurrentBasketValue();
  const index = basket.basketItems.findIndex(i => i.id === item.id);
  if (index === -1){
      return;
    }
    else {
        basket.basketItems.splice(index, 1);
    }
  this.setBasket(basket);
}
removeCustomItem(item: ICustomOrder){
const basket = this.getCurrentBasketValue();
const index = basket.customOrderItems.findIndex(i => i.modelName = item.modelName);
if (index === -1)
  {
    return;
  }
  else {
    basket.customOrderItems.splice(index, 1);
  }
this.setBasket(basket);
}
incrementCustomItem(item: ICustomOrder){
  const basket = this.getCurrentBasketValue();
  const index = basket.customOrderItems.findIndex(i => i.modelName === item.modelName);
  if (index === -1){
      return;
    }
    else {
      basket.customOrderItems[index].quantity += 1;
    }
  this.setBasket(basket);
}
decrementCustomItem(item: ICustomOrder){
  const basket = this.getCurrentBasketValue();
  const index = basket.customOrderItems.findIndex(i => i.modelName === item.modelName);
  if (index === -1){
      return;
    }
    else {
      basket.customOrderItems[index].quantity -= 1;
      if (basket.customOrderItems[index].quantity === 0)
      {
        basket.customOrderItems.splice(index, 1);
      }
    }
  this.setBasket(basket);
}
  private checkItemExists(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }
  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }
  private mapProdToItem(item: IProduct, quantityy: number): IBasketItem{
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantityy,
      typeId: item.typeId
    };
  }
  private updatePriceTotal(){
      let totals = 0;
      this.basketSource.value.basketItems.forEach(i => totals += i.price * i.quantity);
      this.basketSource.value.customOrderItems.forEach(i => totals += i.price * i.quantity);
      const value: BasketValue = {
        price : totals
      };
      this.basketValue.next(value);
    }
  }

