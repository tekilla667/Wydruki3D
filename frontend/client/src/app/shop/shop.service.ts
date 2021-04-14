import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../shared/Models/product';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  fillament: number;
  color = 1;
  materialSource = new BehaviorSubject<THREE.MeshPhongMaterial>(null);
  material$ = this.materialSource.asObservable();
  baseUrl = 'https://localhost:5001/';
  constructor(private http: HttpClient) { }
  getAllProducts(){
    return this.http.get<IProduct[]>(this.baseUrl + 'products/all');
  }
  getProductsWithKeys(productsPerPage?: number, currentPageIndex?: number, typeIdSearch?: number, priceSort?: number, name?: string)
  {

    let params = new HttpParams();

    if (productsPerPage)
    {
      params = params.append('productsPerPage', productsPerPage.toString());
    }
    if (currentPageIndex)
    {
      params = params.append('currentPageIndex', currentPageIndex.toString());
    }
    if (typeIdSearch)
    {
      params = params.append('typeIdSearch', typeIdSearch.toString());
    }
    if (priceSort)
    {
      params =  params.append('priceSort', priceSort.toString());
    }
    if (name)
    {
      params = params.append('name', name);
    }
    return this.http.get<IProduct[]>(this.baseUrl + 'products', {observe: 'response', params})
    .pipe(map (response => {
      return response.body;
    }));
  }
  getProductById(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id.toString());
  }
}
