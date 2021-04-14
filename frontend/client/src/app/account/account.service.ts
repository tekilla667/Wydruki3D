import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Address } from '../shared/Models/address';
import { ITenLastOrdersDTO } from '../shared/Models/tenLastOrders';
import { IUser } from '../shared/Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl = environment.ApiUrl;
private currentUser = new BehaviorSubject<IUser>(null);
currentUser$ = this.currentUser.asObservable();
  constructor(private http: HttpClient, private router: Router) { }
  login(values: any){
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
          if (!user.isAdmin)
          {
            this.router.navigateByUrl('/');
          }

          if (user.isAdmin)
          {
            this.router.navigateByUrl('/admin/administratordashboard');
          }
        }})
    );
  }
  register(values: any){
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUser.next(user);
      })
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }
  checkEmailExists(email: string){
    return this.http.get(this.baseUrl + '/account/emailexists?email=' + email);
  }
  loadCurrentUser(token: string){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'account', {headers}).pipe(map(
      (user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUser.next(user);
        }
      }
    ));

  }
  getCurrentUserValue(){
    return this.currentUser.value;
  }
  getUserOrders(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<ITenLastOrdersDTO[]>(this.baseUrl + 'admin/bearerOrders', {headers});
  }
  getUserAddress(){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<Address>(this.baseUrl + 'account/address', {headers});
  }
  changePassword(val: any){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.baseUrl + 'account/changeUserPassword', val, {headers});
  }
  changeEmail(val: any){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post(this.baseUrl + 'account/changeUserEmail', val, {headers});
  }
 changeUserAddress(val: any){
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  return this.http.put(this.baseUrl + 'account/address', val, {headers});
 }
 deleteUser(val: any){
  let headers = new HttpHeaders();
  headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  return this.http.put(this.baseUrl + 'account/deleteAccount', val, {headers});
 }
 removeUserFromMemory(){
   this.currentUser.next(null);
 }
}
