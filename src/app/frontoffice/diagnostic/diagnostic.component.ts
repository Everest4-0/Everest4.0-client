import { UserEvaluationService } from './../../services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';
import { UserEvaluation } from './../../models/user-evaluation';
import { EvaluationService } from '../../services/evaluation.service';
import { Evaluation } from '../../models/evaluation';
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
  userEvaluations : Array<UserEvaluation> = [];
  currentEvaluation: UserEvaluation = new UserEvaluation();
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];

  constructor(
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private userEvaluationService: UserEvaluationService,
    private auth: AuthService) {
  }

  ngOnInit() {
    this.currentEvaluation.user = this.currentEvaluation.evaluator = this.auth.user
    this.evaluationService.all().subscribe(evaluations => this.evaluations = this.groupBy(evaluations, 'group'))
    this.userEvaluationService.all({ userId: this.auth.user.id }).subscribe(evaluations => this.userEvaluations = evaluations)
  }
  groupBy(xs, key) {
    let final = xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


    return Object.keys(final).map((k) => [k, final[k]]);
  };
  openModal(id: string, v: Evaluation) {
    this.currentEvaluation.evaluation = v
    this.currentEvaluation.points = 0
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
  onChange(e) {
    this.currentEvaluation.points = e
  }
  saveEvaluation() {
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {
      this.currentEvaluation.user = this.currentEvaluation.evaluator = this.auth.user
      Swal.fire(
        'Good job!',
        'Avaliação salva com sucesso',
        'success'
      )
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
}
