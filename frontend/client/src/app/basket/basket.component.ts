import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketValue } from '../shared/Models/basket';
import { ICustomOrder } from '../shared/Models/CustomOrder';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketValue$: Observable<IBasketValue>;
  constructor(private basketService: BasketService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketValue$ = this.basketService.basketValue$;
  }
  decrement(item: IBasketItem){
    this.basketService.decrementItem(item);
  }
  increment(item: IBasketItem){
    this.basketService.incrementItem(item);
  }
  remove(item: IBasketItem){
    this.basketService.removeItem(item);
  }
  decrementCustomItem(item: ICustomOrder){
    this.basketService.decrementCustomItem(item);
  }
  incrementCustomItem(item: ICustomOrder){
    this.basketService.incrementCustomItem(item);
  }
  removeCustomItem(item: ICustomOrder){
    this.basketService.removeCustomItem(item);
  }
  Order(){
    this.router.navigateByUrl('/checkout');
  }
  getFillamentNameById(id: number){
    switch (id) {
      case 1:
        return 'PLA';
      case 2:
        return 'ABS';
      case 3:
        return 'TPE';
      case 4:
        return 'TPU';
      default:
        return 'NieznanyFilament';
    }
  }
  getColorById(id: number){
    switch (id) {
      case 1:
        return 'Czerwony';
      case 2:
        return 'Zielony';
      case 3:
        return 'Niebieski';
      case 4:
        return 'Pomarańczowy';
      default:
        return 'NieznanyKolor';
    }
  }
  logBasket(){
    console.log(this.basket$);
  }

}
