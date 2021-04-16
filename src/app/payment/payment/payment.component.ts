import { ChargeService } from './../../services/payemnt/charge.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

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

  public services: Array<any> = [{
    id: 'basic',
    title: 'Pacote Basico',
    price: 4000,
    color: '#2dbcff'
  }];
  public payment = {
    discount: 0,
    quantity: 1,
    currency: 'AOA',
    customer: {
      name: '',
      address: {
        line1: '',
        city: '',
        country: ''
      },

    },
    services: [{
      id: 'basic',
      title: 'Pacote Basico',
      price: 4000,
      color: '#2dbcff'
    }]
  }
  public paymentType;
  public currentStep = 0
  public stepsLabels = ['Selecionar serviço', 'Configurar serviço', 'Seus dados', 'Metodo de Pagamento', 'Resumo']
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  @ViewChild('f') form: NgForm;

  @Output() close: EventEmitter<any> = new EventEmitter<any>()

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
    private stripeService: StripeService,
    private chargeService: ChargeService) { }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]]
    });
  }

  createToken(): void {
    debugger
    const name = this.stripeTest.get('name').value;
    const address = this.stripeTest.get('address').value;
    const city = this.stripeTest.get('city').value;
    const country = this.stripeTest.get('country').value;
    this.payment.customer.address = { line1: address, city: city, country }
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

  next() {
    if (this.currentStep == 3) {
      this.form.ngSubmit.emit();
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
    debugger
    this.payment[key] = $event
  }
  closeMe() {
    this.close.emit()
  }
  get total() { return this.payment.services.reduce((y, x) => x.price + y, 0) * this.payment.quantity }
}
