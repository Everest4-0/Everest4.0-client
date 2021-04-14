import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
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
