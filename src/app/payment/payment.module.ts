import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectServiceComponent } from './select-service/select-service.component';
import { ConfigServiceComponent } from './config-service/config-service.component';
import { UserDataComponent } from './user-data/user-data.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ResumeNCommitComponent } from './resume-n-commit/resume-n-commit.component';
import { PaymentComponent } from './payment/payment.component';

// Import the library
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [
    SelectServiceComponent,
    ConfigServiceComponent,
    UserDataComponent,
    PaymentMethodComponent,
    ResumeNCommitComponent,
    PaymentComponent],
  imports: [
    CommonModule,
    MomentModule,
    ReactiveFormsModule,
    NgxStripeModule.forRoot('pk_test_51IeHexKPeIS2foQkTuM0F6H5Nej1bxE0NIQm48NzJTAk4kA8IaXqDl5Rr5a7FoTsA30HPvkHIgytwSvv048bNukN00kXvH0uva'),
  ],
  exports:[
    PaymentComponent
  ]
})
export class PaymentModule { }
