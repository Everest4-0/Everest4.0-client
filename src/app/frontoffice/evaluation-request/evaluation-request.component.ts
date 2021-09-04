import { ToastService } from 'ng-uikit-pro-standard';
import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { TimeagoIntl } from 'ngx-timeago';
import { EvaluationRequest } from '../../models/diagnostic/evaluation-request';
import { AuthService } from 'app/services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationRequestService } from './../../services/evaluation-request.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from 'app/components/modal';
import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'app/models/diagnostic/evaluation';

import { strings as pt } from 'ngx-timeago/language-strings/pt-br';

@Component({
  selector: 'app-evaluation-request',
  templateUrl: './evaluation-request.component.html',
  styleUrls: ['./evaluation-request.component.scss']
})
export class EvaluationRequestComponent implements OnInit {

  public requests: Array<EvaluationRequest> = []
  public requesteds: Array<EvaluationRequest> = []
  public currentEvaluation: Evaluation = new Evaluation();
  public userEvaluation: UserEvaluation = new UserEvaluation();
  public request: EvaluationRequest = new EvaluationRequest();
  public requestEditable = true;
  public evaluations: Array<any> = [];
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];

  title = 'appBootstrap';
  bodyText: string;
  userEvaluations: Array<UserEvaluation> = [];
  setCurrentEvaluation: UserEvaluation = new UserEvaluation();
  isSelfEvaluation = true;


  constructor(
    private modalService: ModalService,
    private evaluationService: EvaluationService,
    private evaluationRequestService: EvaluationRequestService,
    private userEvaluationService: UserEvaluationService,
    public auth: AuthService,
    private toast: ToastService,
    intl: TimeagoIntl) {
    intl.strings = pt;
    intl.changes.next();
  }

  ngOnInit(): void {

    this.evaluationRequestService.all({ requestedId: this.auth.user.id }).subscribe(requests => {
      this.requests = requests
    })
    this.evaluationRequestService.all({ requesterId: this.auth.user.id }).subscribe(requests => {
      this.requesteds = requests
    })
    this.evaluationService.all().subscribe(evaluations => {
      evaluations.forEach(e => {
        return e.points = this.getCurentEvaluation(e)
      })
      this.evaluations = evaluations.sort((x, y) => x.group > y.group ? -1 : 1)
    })
  }

  saveEvaluation() {
    this.userEvaluation.evaluation = this.currentEvaluation;
    this.userEvaluation.requester = this.request.requester;
    this.userEvaluation.requested = this.auth.user;
    this.userEvaluation.request = this.request;
    this.userEvaluationService.create(this.userEvaluation).subscribe(userEvaluation => {
      this.userEvaluation = new UserEvaluation();

      this.request.evaluations.push(userEvaluation)
      this.evaluations.forEach(e => {
        if (e.id === userEvaluation.evaluationId) {
          return e.points = parseFloat(e.points) + (userEvaluation.points * 1)
        }
      })
      this.toast.success('Auto avaliação sobre ' + this.userEvaluation.evaluation.name
        + ' no Dominio ' + this.userEvaluation.evaluation.group + ' feito com successo para ' + this.userEvaluation.requester.datas.fullName, 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.closeModal('self-evaluation-modal')
    })
  }

  saveEvaluationComent() {
    this.evaluationRequestService.update(this.request).subscribe(e => {
      this.closeModal('evaluation-modal')
      this.toast.success('Registo actualizado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
    })
  }
  selectRequest(item: EvaluationRequest, editable = true) {
    this.request = item;
    this.requestEditable = editable;

    this.userEvaluationService.all({ requestId: this.request.id }).subscribe(uevaluations => {
      this.userEvaluations = uevaluations
      this.evaluationService.all().subscribe(evaluations => {
        evaluations.forEach(e => {
          e.points = this.evaluationPoints(e.id);
        })
        this.evaluations = evaluations// this.groupBy(, 'group')
      })
      this.request.evaluations = uevaluations;
    })
    this.openModal('evaluation-modal')
  }

  evaluationPoints(id: string): number {
    const final = this.userEvaluations.filter(e => e.evaluation.id === id).reduce((t, m) => { return t + m.points }, 0);

    return final
  }

  makeEvaluation(e: Evaluation) {
    if (e.points > 0) { return; }
    this.currentEvaluation = e;
    this.openModal('self-evaluation-modal')
  }
  getCurentEvaluation(e: Evaluation) {
    const u = this.requests.map(m => m.evaluations)[0]

    const f = u.filter(h => h.evaluation.id === e.id)
    return (f.length > 0) ? f[0].points : 0;
  }
  onEvaluationChange(points) {
    this.userEvaluation.points = points
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getUserAvatar(s) {
    return s.split('ttps://').length > 1 ? s : this.auth.serverAddress + s
  }
  updateDescriptions(event) {
    this.request.descriptions = event;
  }
}
