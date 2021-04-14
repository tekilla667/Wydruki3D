import { ToastrService} from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/Models/product';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss']
})
export class StoreItemComponent implements OnInit {
 @Input() product: IProduct;
  constructor(private basketService: BasketService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  addItemToBasket() {
      this.basketService.addItemToBasket(this.product);
      this.toastr.success('Dodano nowy produkt', 'Koszyk');
  }

}
