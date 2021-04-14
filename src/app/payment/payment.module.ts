import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectServiceComponent } from './select-service/select-service.component';
import { ConfigServiceComponent } from './config-service/config-service.component';
import { UserDataComponent } from './user-data/user-data.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ResumeNCommitComponent } from './resume-n-commit/resume-n-commit.component';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    SelectServiceComponent,
    ConfigServiceComponent,
    UserDataComponent,
    PaymentMethodComponent,
    ResumeNCommitComponent,
    PaymentComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PaymentComponent
  ]
})
export class PaymentModule { }
