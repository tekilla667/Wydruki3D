import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRedirect } from 'src/app/shared/Models/modelToken';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  sendReq(){
    var request = new XMLHttpRequest();

    request.open('POST', 'https://secure.payu.com/api/v2_1/orders/');

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd');
   // request.setRequestHeader('access-control-allow-origin','http://localhost:4200');
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    var body = {
      notifyUrl: 'https://your.eshop.com/notify',
      customerIp: '127.0.0.1',
      merchantPosId: '145227',
      description: 'RTV market',
      currencyCode: 'PLN',
      totalAmount: '21000',
      products: [
        {
          name: 'Wireless mouse',
          unitPrice: '15000',
          quantity: '1'
        },
        {
          name: 'HDMI cable',
          unitPrice: '6000',
          quantity: '1'
        }
      ]
    };

    request.send(JSON.stringify(body));
    }
  paymentIntent(){
    console.log('redirectuj mnie');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer 3e5cac39-7e38-4139-8fd6-30adc06a61bd');
    headers = headers.set('Content-Type', 'application/json');
    var body = {
      'notifyUrl': 'https://your.eshop.com/notify',
      'customerIp': '127.0.0.1',
      'merchantPosId': '145227',
      'description': 'RTV market',
      'currencyCode': 'PLN',
      'totalAmount': '21000',
      'products': [
        {
          'name': 'Wireless mouse',
          'unitPrice': '15000',
          'quantity': '1'
        },
        {
          'name': 'HDMI cable',
          'unitPrice': '6000',
          'quantity': '1'
        }
      ]
    };
    console.log(body);
    this.http.post('https://secure.payu.com/api/v2_1/orders/', body, {headers}).pipe(map(
      (response: IRedirect) => {
        console.log(response);
        window.location.href = response.redirectUri;
      }
    ));
  }
}
