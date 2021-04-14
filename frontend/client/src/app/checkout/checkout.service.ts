import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.ApiUrl;
  constructor(private http: HttpClient) { }
  getDeliveryMethods() {
    return this.http.get(this.baseUrl + 'order/deliveries').pipe(
      map((dm: IDeliveryMethod[]) => {
        return dm;
      })
    );
  }
  createOrder(val: FormGroup, deliveryy: string){
    const basket = {
      basketId: localStorage.getItem('basket_id')
    };
    const delivery = {
      deliveryMethod: deliveryy
    };

    const mergedBody = {
     ...basket,
     ...val,
     ...delivery
   };
   console.log(mergedBody);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    alert("Zostaniesz przekierowany na stronę płatności PayU");

    return this.http.post(this.baseUrl + 'order', mergedBody, {headers});
  }
}
