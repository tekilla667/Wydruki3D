import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createCheckoutForm();
  }
  createCheckoutForm(){
    this.checkoutForm = this.formBuilder.group({
      addressForm: this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        street: [null, Validators.required],
        city: [null, Validators.required],
        postCode: [null, Validators.required]
      }),
      deliveryForm: this.formBuilder.group({
        deliveryMethod: [null, Validators.required]
      })
    });
  }
  logForm(){
    console.log(this.checkoutForm.controls['addressForm'].value['firstName']);
  }

}
