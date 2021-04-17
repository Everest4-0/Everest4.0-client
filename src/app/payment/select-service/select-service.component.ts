import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  @Input() service: any = { key: '' };
  @Input() exclusice = false;

  @Output() setService: EventEmitter<any> = new EventEmitter<any>()

  public services = [
    {
      key: 'free',
      title: 'Pacote Free',
      price: 0,
      color: '#4d4d4d'
    }, {
      key: 'basic',
      title: 'Pacote Basico',
      price: 4000,
      color: '#2dbcff'
    }, {
      key: 'premium',
      title: 'Pacote Profissinal',
      price: 34000,
      color: '#eba102'
    }, {
      key: 'coaching',
      title: 'Coaching online',
      price: 7000,
      color: '#02ebb1'
    }
  ]
  constructor() { }

  ngOnInit(): void {
    this.set(this.service.key);
  }

  set(j) {
    debugger
    this.service = this.services.filter(i => i.key == j)[0]
    this.setService.emit(this.service)
  }

}
