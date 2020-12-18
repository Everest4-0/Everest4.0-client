import { WorkSituationService } from './../../../services/data/work-situation.service';
import { WorkSituationForm } from './../../forms/workSituation.form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-work-situation',
  templateUrl: './list-work-situation.component.html',
  styleUrls: ['./list-work-situation.component.css']
})
export class ListWorkSituationComponent implements OnInit {

  public workSituations: Array<WorkSituationForm> = [];

  constructor(private workSituationService: WorkSituationService) { }

  ngOnInit(): void {
    this.workSituationService.all({}).subscribe(datas=>this.workSituations=datas);
  }

}
