import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITenLastOrdersDTO } from 'src/app/shared/Models/tenLastOrders';
import { AccountService } from '../account.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  userOrders: ITenLastOrdersDTO[];
  orderDetails: ITenLastOrdersDTO;
  constructor(private modalService: NgbModal, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getUserOrders();
  }
  getUserOrders(){
    this.accountService.getUserOrders().subscribe(res => this.userOrders = res);
  }
   setOrderDetails(id: number){
    this.orderDetails = this.userOrders.find(x => x.id === id);
  }
  selectEvent(val: any) {

  }

 onChangeSearch(val: string) {
   // fetch remote data from here
   // And reassign the 'data' which is binded to 'data' property.
 }

 onFocused(e){
   // do something when input is focused
 }
 open(content, orderid: number) {
  this.orderDetails = this.userOrders.find(x => x.id === orderid);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  }, (reason) => {

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
}
