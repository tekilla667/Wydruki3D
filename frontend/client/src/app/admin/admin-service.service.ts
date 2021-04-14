import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAdminUsersList } from '../shared/Models/admin';
import { IDeliveryMethod } from '../shared/Models/deliveryMethod';
import { IProduct, IProductToAdd } from '../shared/Models/product';
import { ITenLastOrdersDTO } from '../shared/Models/tenLastOrders';
import { IUserEmailId } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  baseUrl = environment.ApiUrl;
  constructor(private http: HttpClient, private toasterService: ToastrService) { }
  getLastMonthIncome(){
    return this.http.get<number[]>(this.baseUrl + 'admin/lastMonth', {observe: 'response'}).pipe(map(res => {
      return res.body;
    }));
  }
  getTenLastOrders(){
    return this.http.get<ITenLastOrdersDTO[]>(this.baseUrl + 'admin/latest', {observe: 'response'}).pipe(map(response => {
      return response.body;
    }));
  }
  getOrders(skip: number){
    return this.http.get<ITenLastOrdersDTO[]>(this.baseUrl + 'admin/getOrdersWithSkip/' + skip.toString() ,
     {observe: 'response'}).pipe(map(response => {
      return response.body;
    }));
  }
  addNewStoreProduct(model: IProductToAdd){
    this.toasterService.success('Dodano nowy produkt', 'Lista Produktow');
    return this.http.post(this.baseUrl + 'admin/addNewProduct', model);
  }
  deleteStoreProduct(id: number){
    this.toasterService.info('Usunieto produkt nr ' + id.toString(), 'Lista Produktow');
    return this.http.delete(this.baseUrl + 'products/' + id.toString());
  }
  addNewDeliveryMethod(model: any){
    this.toasterService.success('Dodano nową metodę dostawy', 'Metody dostawy');
    return this.http.post(this.baseUrl + 'admin/addNewDeliveryMethod', model);
  }
  deleteDeliveryMethod(id: number){
    this.toasterService.info('Usunięto metodę dostawy nr ' + id.toString(), 'Metody dostawy');
    return this.http.delete(this.baseUrl + 'admin/deleteDelivery/' + id.toString());
  }
  getAllProducts(){
    return this.http.get<IProduct[]>(this.baseUrl + 'products/all');
  }
  updateOrderStatus(id: number, newStatus: number){
    const body = { orderId: id, newStatus};
    this.toasterService.success('Zaktualizowano status zamówienia', 'Zamówienia');

    return this.http.post(this.baseUrl + 'admin/updateOrderStatus', body);
  }
  getAllUserEmails(){
    return this.http.get<IUserEmailId[]>(this.baseUrl + 'account/getallusedemails');
  }
  getOrdersByUsersId(id: string){
    return this.http.get<ITenLastOrdersDTO[]>(this.baseUrl + 'admin/getUsersOrders/' + id.toString());
  }
  getAdminUsersList(){
    return this.http.get<IAdminUsersList[]>(this.baseUrl + 'admin/userslist');
  }
  deleteUser(id: string){
    this.toasterService.success('Pomyślnie usunięto użytkownika', 'Użytkownicy');
    return this.http.delete(this.baseUrl + 'admin/user/' + id.toString());
  }
  getDeliveryMethods(){
    return this.http.get<IDeliveryMethod[]>(this.baseUrl + 'order/deliveries');
  }
}
