import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ITenLastOrdersDTO } from 'src/app/shared/Models/tenLastOrders';
import { IUserEmailId } from 'src/app/shared/Models/user';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  keyword = 'email';
  lastTenOrders: ITenLastOrdersDTO[];
  orderDetails: ITenLastOrdersDTO;
  currentUserFound: IUserEmailId;
  userOrders: ITenLastOrdersDTO[];
  currentOrdersIndex = 0;
  statusSelected = 0;
 closeResult = '';
 data$: Observable<IUserEmailId[]>;
 editData: FormGroup;
  constructor(private modalService: NgbModal, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.createForm();
    this.updateOrders();
    this.assignDataObservable();
  }
  assignDataObservable(){
    this.data$ = this.adminService.getAllUserEmails();
  }
  open(content, orderid: number, specificUser = false) {
    if (!specificUser)
    {
      this.orderDetails = this.lastTenOrders.find(x => x.id === orderid);
    }
    else
    {
      this.orderDetails = this.userOrders.find( x => x.id === orderid);
    }

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private createForm(){
    this.editData = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  updateOrders(a = this.currentOrdersIndex){
    this.adminService.getOrders(a).subscribe((res) =>
    { this.lastTenOrders = res;
    });
  }

   incrementOrders(){
    this.currentOrdersIndex ++;
    this.updateOrders();
  }
   decrementOrders(){
    this.currentOrdersIndex --;
    this.updateOrders();
  }
  changeStatusSelected(id: number){
    this.statusSelected = id;
  }
  updateOrderStatus(){
    this.adminService.updateOrderStatus(this.orderDetails.id, this.statusSelected).subscribe();
  }
  selectEvent(val: any) {
      this.currentUserFound = val;
      this.adminService.getOrdersByUsersId(this.currentUserFound.id).subscribe(res => this.userOrders = res);
   }

   onChangeSearch(val: string) {
     // fetch remote data from here
     // And reassign the 'data' which is binded to 'data' property.
   }
 
   onFocused(e){
     // do something when input is focused
   }

}
