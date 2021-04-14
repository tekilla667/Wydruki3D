import { Component, OnInit } from '@angular/core';
import { CustomOrderService } from '../custom-order.service';

@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.scss']
})
export class CustomOrderComponent implements OnInit {
filteToUpload: File = null;
  constructor(private customOrderService: CustomOrderService) { }

  ngOnInit(): void {
  }
handleFileInput(files: FileList){
  this.filteToUpload = files.item(0);
  console.log('lecimy');
  console.log(this.filteToUpload);
  this.customOrderService.postFile(this.filteToUpload).subscribe(
    data => {
      console.log(data);
    }
  );
}

}
