import { Evaluation } from './../../../models/diagnostic/evaluation';
import { EvaluationService } from './../../../services/evaluation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.css']
})
export class ListEvaluationComponent implements OnInit {

  public evaluations: Array<Evaluation> = []
  public evaluationPaginated: Array<Evaluation> = []

  constructor(private evaluationService: EvaluationService) { }

  onChangePage = (evaluations) => this.evaluationPaginated = evaluations;

  ngOnInit(): void {
    this.evaluationService.all().subscribe(evaluations => this.evaluations = evaluations.sort((x, y) => x.group > y.group ? 1 : -1))
  }
}
