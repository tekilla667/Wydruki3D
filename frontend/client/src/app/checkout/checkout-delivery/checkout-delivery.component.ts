import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/Models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethods: IDeliveryMethod[];
  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.getDeliveryMethods();
  }
  getDeliveryMethods(){
   this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
     this.deliveryMethods = dm;
   });
  }
  setDeliveryMethod(){
    let index = 0;
    index = this.checkoutForm.controls['deliveryForm'].value['deliveryMethod'];
    this.basketService.setDelivery(this.deliveryMethods[index - 1]);
  }

}
