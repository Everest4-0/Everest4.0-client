import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  public isTab = 1;
  public switchtabTo = (i) => this.isTab = i;
  constructor() { }

  ngOnInit(): void {
  }


}
