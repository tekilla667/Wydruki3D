import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Address } from 'src/app/shared/Models/address';
import { IBasketValue } from 'src/app/shared/Models/basket';
import { IDeliveryMethod } from 'src/app/shared/Models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
@Input() checkoutForm: FormGroup;
userAddress: Address;
basketTotal$: Observable<IBasketValue>;
deliveryMethod$: Observable<IDeliveryMethod>;
total: Observable<number>;
  constructor(private basketService: BasketService, private checkoutService: CheckoutService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketValue$;
    this.deliveryMethod$ = this.basketService.delivery$;

  }

  getBasketValue(): number{
    return this.basketService.getBaskePrice();
  }

  placeOrder()
  {
    const deliveryId = this.checkoutForm.controls['deliveryForm'].value['deliveryMethod']
    this.checkoutService.createOrder(this.checkoutForm.value, deliveryId).subscribe();
  }


}
