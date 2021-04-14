import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { IUser } from './shared/Models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Drukarex';
  constructor(private basketService: BasketService, private accountService: AccountService){}
  ngOnInit(): void {
    this.loadBasket();
    this.loadUser();
   // localStorage.setItem('color', '1');
  }
  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if (basketId){
   this.basketService.getBasket(basketId).subscribe(() => {
   console.log('initialised basket');
   }, error => {
   console.log(error);
   });
     }
  }
  loadUser(){
    const token = localStorage.getItem('token');
    if (token)
    {
    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    });
    }
  }
}
