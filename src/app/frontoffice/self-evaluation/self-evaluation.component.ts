import { Evaluation } from './../../models/evaluation';
import { AuthService } from './../../services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from './../../components/modal/modal.service';
import { UserEvaluation } from './../../models/user-evaluation';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.css']
})
export class SelfEvaluationComponent implements OnInit {


  title = 'appBootstrap';
  bodyText: string;
  evaluations: Array<any> = []
  userEvaluations: Array<UserEvaluation> = [];
  currentEvaluation: UserEvaluation = new UserEvaluation();
  isSelfEvaluation = true;
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];

  constructor(
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private userEvaluationService: UserEvaluationService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.currentEvaluation.requester = this.currentEvaluation.requested = this.auth.user

    this.userEvaluationService.all({ userId: this.auth.user.id, requestedId: this.auth.user.id }).subscribe(evaluations => {
      this.evaluationService.all().subscribe(evaluations => {
        evaluations.forEach(e => {
          e.points = this.evaluationPoints(e.id);
        })
        this.evaluations = evaluations// this.groupBy(, 'group')
      })
      this.userEvaluations = evaluations
    })
  }

  getPbvalue(arr: Array<any>) {
    return (arr.reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / (4 * arr.length) * 100).toFixed(2);

  }
  openModal(id: string, v: Evaluation) {
    if (v.points > 0) return;
    this.currentEvaluation.evaluation = v
    this.currentEvaluation.points = 0
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.currentEvaluation.points = 0
    this.modalService.close(id);
  }
  evaluationPoints(id: string): number {
    let total = this.userEvaluations.filter(e => e.evaluation.id == id).reduce((t, m) => { return t + m.points }, 0);

    return total;
  }
  onChange(e) {
    this.currentEvaluation.points = e
  }
  saveEvaluation() {
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {
      this.evaluations.forEach(x => {
        if (x.id == e.evaluationId)
          x.points = e.points
      })
      this.currentEvaluation.requested = this.currentEvaluation.requester = this.auth.user
     /* Swal.fire(
        'Good job!',
        'Avaliação salva com sucesso',
        'success'
      )
*/
      this.currentEvaluation = new UserEvaluation();

      this.currentEvaluation.requester = this.currentEvaluation.requested = this.auth.user
    })
    this.modalService.close('self-evaluation-modal');
  }

}
