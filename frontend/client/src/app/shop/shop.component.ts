import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/Models/product';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  innerWidth: any;
  products: IProduct[];
  productsToDisplay: number;
  currentIndex = 1;
  productsPerPage = 9;
  priceSort = 0;
  typeIdSearch = 0;
  name: string;
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.update();
    this.innerWidth = window.innerWidth;
    localStorage.removeItem('color');
  }
  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
  console.log(innerWidth);
}
  update(): void{
    this.shopService.getProductsWithKeys(this.productsPerPage, this.currentIndex, this.typeIdSearch, this.priceSort, this.name ).
    subscribe(response => {
      this.products = response;
      this.productsToDisplay = this.products.length;
      console.log(this.products);
    }, error => {
      console.log(error);
    });
  }
  setCurrentType(id: number): void{
    this.typeIdSearch = id;
  }
  setPriceSort(id: number): void{
    this.priceSort = id;
  }
  setName(): void{
    this.name = this.searchTerm.nativeElement.value;
  }
  resetName(): void{
    this.searchTerm.nativeElement.value = '';
    this.name = null;
  }
  changePageIndex(num: number): void{
    this.currentIndex += num;
  }
  resetPageIndex(): void{
    this.currentIndex = 1;
  }

}
