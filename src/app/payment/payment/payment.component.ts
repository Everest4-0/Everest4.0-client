import { Component, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
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

  public paymentType;
  public currentStep = 3
  public stepsLabels = ['Selecionar serviço', 'Configurar serviço', 'Seus dados', 'Metodo de Pagamento', 'Resumo']
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
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

  constructor(private fb: FormBuilder, private stripeService: StripeService) {}

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
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
    this.currentStep = this.currentStep === 4 ? 4 : this.currentStep + 1;
  }

  prev() {
    this.currentStep = this.currentStep === 0 ? 0 : this.currentStep - 1;
  }
  setService($event) {
    this.services = [$event]
  }

  get total() { return this.services.reduce((y, x) => x.price + y, 0) }
}
