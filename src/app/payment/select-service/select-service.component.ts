import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit {

  @Input() service;

  @Output() setService: EventEmitter<any> = new EventEmitter<any>()
  public services = [
    {
      id: 'free',
      title: 'Pacote Free',
      price: 0,
      color:'#4d4d4d'
    }, {
      id: 'basic',
      title: 'Pacote Basico',
      price: 4000,
      color:'#2dbcff'
    }, {
      id: 'premium',
      title: 'Pacote Profissinal',
      price: 34000,
      color:'#eba102'
    }, {
      id: 'coaching',
      title: 'Coaching online',
      price: 7000,
      color:'#02ebb1'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  set(j) {
    debugger
    this.service = j;
    this.setService.emit(this.services.filter(i => i.id == j)[0])
  }

}
