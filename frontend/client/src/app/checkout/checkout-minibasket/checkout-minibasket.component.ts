import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketValue } from 'src/app/shared/Models/basket';

@Component({
  selector: 'app-checkout-minibasket',
  templateUrl: './checkout-minibasket.component.html',
  styleUrls: ['./checkout-minibasket.component.scss']
})
export class CheckoutMinibasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketValue$: Observable<IBasketValue>;
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basketValue$ = this.basketService.basketValue$;
  }


}
