import { EvaluationRequest } from './../../models/evaluation-request';
import { AuthService } from 'app/services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationRequestService } from './../../services/evaluation-request.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from 'app/components/modal';
import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'app/models/evaluation';

@Component({
  selector: 'app-evaluation-request',
  templateUrl: './evaluation-request.component.html',
  styleUrls: ['./evaluation-request.component.scss']
})
export class EvaluationRequestComponent implements OnInit {

  public requests:Array<EvaluationRequest>=[]
  public currentEvaluation:Evaluation=new Evaluation();

  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];
  constructor(
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private evaluationRequestService: EvaluationRequestService,
    private userEvaluationService: UserEvaluationService,
    public auth: AuthService) { }

  ngOnInit(): void {
    let filter={$filter:this.auth.user.id}
    this.evaluationRequestService.all(filter).subscribe(requests=>{
      this.requests=requests
    })
  }
  saveEvaluation(){

  }
}
