import { AuthService } from './../../services/auth.service';
import { Address } from './../../models/payment/address';
import { Customer } from './../../models/payment/customer';
import { Charge } from './../../models/payment/charge';
import { ChargeService } from './../../services/payemnt/charge.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

import { StripeService, StripeCardComponent } from 'ngx-stripe';

import * as $ from 'jquery'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {


  public payment: Charge = new Charge();


  public currentStep = 0
  public stepsLabels = ['Selecionar serviço', 'Configurar serviço', 'Seus dados', 'Metodo de Pagamento', 'Resumo']
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild('f') form: NgForm;
  @Input() serviceKey;
  @Input() exclusice = false;
  @Output() close: EventEmitter<any> = new EventEmitter<any>()
  @Output() done: EventEmitter<any> = new EventEmitter<any>()

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'pt'
  };

  stripeTest: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private stripeService: StripeService,
    private chargeService: ChargeService) { }

  ngOnInit(): void {
    this.payment.services = [{
      key: this.serviceKey
    }]

    this.payment.customer.user = this.auth.user;
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  createToken(): void {
    this.payment.customer.name = this.stripeTest.get('name').value;

    this.payment.customer.address.line1 = this.stripeTest.get('address').value;
    this.payment.customer.address.city = this.stripeTest.get('city').value;
    this.payment.customer.address.country = this.stripeTest.get('country').value;
    this.payment.descriptions = 'Everest4.0 - serviço ' + this.payment.services[0].title
    this.stripeService
      .createToken(this.card.element, { name: this.payment.customer.name })
      .subscribe((result) => {
        if (result.token) {
          this.payment.customer.source = result.token
          this.chargeService.create(this.payment).subscribe(payment => {
            // tslint:disable-next-line:radix
            this.done.emit({ payment: payment, quantity: parseInt(this.payment.quantity.toString()) })
            this.currentStep = 4
          })
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  createReferencepayment() {
    this.chargeService.create(this.payment).subscribe(payment => {
      this.done.emit({ payment: payment, quantity: parseInt(this.payment.quantity.toString()) })
      this.currentStep = 4
    })
  }
  next() {
    if (this.currentStep === 3) {
      if (this.payment.type === 1) {
        this.form.ngSubmit.emit();
      } else if (this.payment.type === 0) {
        this.createReferencepayment()
      }
    } else {

      this.currentStep = this.currentStep === 4 ? 4 : this.currentStep + 1;
      this.currentStep = this.currentStep === 2 ? 3 : this.currentStep
    }
  }

  prev() {
    this.currentStep = this.currentStep === 0 ? 0 : this.currentStep - 1;
    this.currentStep = this.currentStep === 2 ? 1 : this.currentStep
  }

  setService($event) {
    this.payment.services = [$event]
  }

  setValue($event, key) {
    this.payment[key] = $event
  }
  closeMe(f = false) {
    this.close.emit(f)
  }
  get total() { return this.payment.services.reduce((y, x) => x.price + y, 0) * this.payment.quantity }
}
