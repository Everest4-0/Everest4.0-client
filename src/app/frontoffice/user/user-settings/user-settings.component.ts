import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  notifications=[
    'Pedidos de avaliação',
    'Avaliação de Feedback 360º feito',
    'Tarefas em atraso',
    'Orçamentos elevado',
    'Orçamentos em desvio',
  ]
newscategories=['News','Ageing of newspaper readership','Breaking news','Business journalism','Delhi riots during Trump India visit 2020','Entertainment journalism','Global news flow','Leaders´ debate','Local news','Media monitoring service','News bureau','Online newsroom','Peace Data','Political journalism','Social media newsroom','Sports journalism','The Manc','Maggie Topkis','Weather forecasting','World news']


  constructor() { }

  ngOnInit(): void {
  }

}
