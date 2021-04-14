import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IProduct, IProductToAdd } from 'src/app/shared/Models/product';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
  providers: [AdminServiceService]
})
export class AdminProductsComponent implements OnInit {
  keyword = 'name';
  newProductForm: FormGroup;
  deleteProduct: FormGroup;
  productToDelete: IProduct;
  data$: Observable<IProduct[]>;
  constructor(private adminService: AdminServiceService) {
   }

  ngOnInit(): void {
    this.createForm();
    this.update();
  }
  update(): void{
    this.data$ = this.adminService.getAllProducts();
  }
  createForm(){
    this.newProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      typeId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
      description: new FormControl('', Validators.required),
      pictureUrl: new FormControl('', Validators.required)
    });
    this.deleteProduct = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }
  onSubmit(){
    console.log(this.newProductForm);
    const model: IProductToAdd = {
      description : this.newProductForm.value.description,
      name : this.newProductForm.value.name,
      price : Number(this.newProductForm.value.price),
      pictureUrl : this.newProductForm.value.pictureUrl,
      typeId : Number(this.newProductForm.value.typeId)
    };
    console.log(model);
    this.adminService.addNewStoreProduct(model).subscribe();
  }
  deleteProductRequest(){
    this.adminService.deleteStoreProduct(this.productToDelete.id).subscribe();
  }
  selectEvent(item: IProduct) {
   this.productToDelete = item;
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    // do something when input is focused
  }
}
