import { UserEvaluationService } from './../../services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';
import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { EvaluationService } from '../../services/evaluation.service';
import { Evaluation } from 'app/models/diagnostic/evaluation';
import { ModalService } from './../../components/modal/modal.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {

  title = 'appBootstrap';
  bodyText: string;
  evaluations: Array<any> = []
  userEvaluations: Array<UserEvaluation> = [];
  currentEvaluation: UserEvaluation = new UserEvaluation();
  isTab = 1;
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];

  constructor(
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private userEvaluationService: UserEvaluationService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.currentEvaluation.requester = this.currentEvaluation.requested = this.auth.user

    this.userEvaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => {
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
    this.currentEvaluation.evaluation = v
    this.currentEvaluation.points = 0
    this.modalService.open(id);
  }
  evaluationPoints(id: string): number {
    let total = this.userEvaluations.filter(e => e.evaluation.id == id).reduce((t, m) => { return t + m.points }, 0);

    return total;
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
  onChange(e) {
    this.currentEvaluation.points = e
  }
  saveEvaluation() {
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {
      this.evaluations.push(this.currentEvaluation)
      this.currentEvaluation.requested = this.currentEvaluation.requester = this.auth.user
      Swal.fire(
        'Sucesso!',
        'Avaliação salva com sucesso',
        'success'
      )

      this.currentEvaluation = new UserEvaluation();
    })
    this.modalService.close('self-evaluation-modal');
  }
  reg() {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }

  switchtabTo(v: number) {
    this.isTab = v
  }
}
