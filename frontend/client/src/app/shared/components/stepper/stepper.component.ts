import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {
@Input() isLinear: boolean;
  ngOnInit(): void {
    this.linear = this.isLinear;
    this.selectedIndex = 0;
  }
  onClick(index: number){
    this.selectedIndex = index;
    console.log('klikles');
    console.log(this.selectedIndex);
  }

}
