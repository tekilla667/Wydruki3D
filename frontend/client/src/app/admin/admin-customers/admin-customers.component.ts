import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAdminUsersList } from 'src/app/shared/Models/admin';
import { IUserEmailId } from 'src/app/shared/Models/user';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss']
})
export class AdminCustomersComponent implements OnInit {
  keyword = 'email';
  userToDelete: IUserEmailId;
  adminUsersList: IAdminUsersList[];
  data$: Observable<IUserEmailId[]>;
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.getAdminUsersList();
    this.assignDataObservable();
  }
  assignDataObservable(){
    this.data$ = this.adminService.getAllUserEmails();
  }
  getAdminUsersList(){
    this.adminService.getAdminUsersList().subscribe(
      res => this.adminUsersList = res
    );
  }
  selectEvent(val: IUserEmailId) {
    this.userToDelete = val;
 }

 onChangeSearch(val: string) {
   // fetch remote data from here
   // And reassign the 'data' which is binded to 'data' property.
 }

 onFocused(e){
   // do something when input is focused
 }
  deleteUser(){
    this.adminService.deleteUser(this.userToDelete.id).subscribe();
  }
}
