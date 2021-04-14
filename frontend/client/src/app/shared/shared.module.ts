import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule} from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    CdkStepperModule
  ],
  exports: [
    CdkStepperModule,
    StepperComponent
  ]
})
export class SharedModule { }
