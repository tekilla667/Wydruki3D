import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { IDeliveryMethod } from 'src/app/shared/Models/deliveryMethod';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-delivery',
  templateUrl: './admin-delivery.component.html',
  styleUrls: ['./admin-delivery.component.scss']
})
export class AdminDeliveryComponent implements OnInit {
  keyword = 'name';
  data$: Observable<IDeliveryMethod[]>;
  deliveryMethodToDelete: IDeliveryMethod;
AddDeliveryMethod: FormGroup;
RemoveDeliveryMethod: FormGroup;
  constructor(private adminService: AdminServiceService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.data$ = this.adminService.getDeliveryMethods();
  }
  createForm(){
    this.AddDeliveryMethod = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      description: new FormControl('', Validators.required),
      deliveryTime: new FormControl('', Validators.required)
  });
    this.RemoveDeliveryMethod = new FormGroup({
      id:  new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }
  onSubmit(){
    this.adminService.addNewDeliveryMethod(this.AddDeliveryMethod.value).subscribe();
  }
  onDeleteSubmit(){
    console.log(this.deliveryMethodToDelete);
    this.adminService.deleteDeliveryMethod(this.deliveryMethodToDelete.id).subscribe();
  }
  selectEvent(val: IDeliveryMethod) {
    this.deliveryMethodToDelete = val;
 }

 onChangeSearch(val: string) {
   // fetch remote data from here
   // And reassign the 'data' which is binded to 'data' property.
 }

 onFocused(e){
   // do something when input is focused
 }
}
