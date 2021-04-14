import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperPanelComponent } from '../core/upper-panel/upper-panel.component';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [UpperPanelComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  exports: [UpperPanelComponent]
})
export class CoreModule { }
