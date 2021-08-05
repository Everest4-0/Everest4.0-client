import { EvaluationRequest } from './../../../models/diagnostic/evaluation-request';


import { ToastService } from 'ng-uikit-pro-standard';
import { Evaluation } from 'app/models/diagnostic/evaluation';
import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalService } from 'app/components/modal';
import { EvaluationService } from 'app/services/evaluation.service';
import { UserEvaluationService } from 'app/services/user-evaluation.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})

export class EvaluationComponent implements OnInit {

  @Input() requester;
  @Input() requested;
  @Input() editable;
  @Input() request = new EvaluationRequest();
  @Input() evaluations;
  title = 'appBootstrap';
  bodyText: string;

  userEvaluations: Array<UserEvaluation> = [];
  currentEvaluation: UserEvaluation = new UserEvaluation();
  isSelfEvaluation = true;
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];

  constructor(
    private modalService: ModalService,
    private userEvaluationService: UserEvaluationService,
    private auth: AuthService,
    private toast: ToastService) {
  }

  ngOnInit() {
    this.currentEvaluation.requester = this.requester
    this.currentEvaluation.requested = this.requested
    this.currentEvaluation.request = this.request
  }

  getPbvalue = (arr: Array<any>) =>
    (arr.reduce((t: number, v) => { return t + (parseInt(v.points)) }, 0) / (4 * arr.length) * 100).toFixed(2);

  openModal(id: string, v: Evaluation) {
    debugger
    if (v.points > 0) {
      this.toast.warning('Já foi feita auto avaliação sobre ' + v.name + ' no Dominio ' + v.group + ' Aguarde próximo ciclo ou contacte o apoio ao cliente',
        'Atenção', {
        timeOut: 5000,
      })
      return;
    };

    this.currentEvaluation.request = this.request
    this.currentEvaluation.evaluation = v
    this.currentEvaluation.points = 0
    this.modalService.open(id);
  }
  closeModal(id: string): void {
    this.currentEvaluation.points = 0
    this.modalService.close(id);
  }
  evaluationPoints = (id: string): number =>
    this.userEvaluations.filter(e => e.evaluation.id === id).reduce((t, m) => { return t + m.points }, 0);

  onChange = (e) =>
    this.currentEvaluation.points = e;

  saveEvaluation() {
    this.currentEvaluation.requester = this.requester
    this.currentEvaluation.requested = this.requested
    this.currentEvaluation.request = this.request
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {
      this.evaluations.forEach(x => {
        if (x.id === e.evaluationId) {
          x.points = e.points
        }
      })

      this.currentEvaluation.requested = this.currentEvaluation.requester = this.auth.user
      this.toast.success(`Auto avaliação sobre ${this.currentEvaluation.evaluation.name} no Dominio ${this.currentEvaluation.evaluation.group} feito com successo`, 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
      this.currentEvaluation = new UserEvaluation();

      this.currentEvaluation.requester = this.currentEvaluation.requested = this.auth.user
      this.modalService.close('self-evaluation-modal');
    })
  }
  removeEvaluation = (group: string) =>
    this.userEvaluationService.remove({ group }).subscribe(evaluations => {
      this.evaluations.filter(x => {
        if (x.group === group) {
          x.points = 0
        }
      })
      this.toast.success(`A avaliação do domínio ${group} foi reiniciado com successo`, 'Sucesso', {
        timeOut: 10000,
        progressBar: true,
      })
    })

}

