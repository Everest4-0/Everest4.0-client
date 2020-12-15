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
  public evaluations;
  label = ['Insuficiente', 'Suficiente', 'Bom', 'Excelente'];
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
    var filter = { requestedId: this.auth.user.id }
    this.evaluationRequestService.all(filter).subscribe(requests => {
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
        if (e.id == userEvaluation.evaluationId)
          return e.points = parseFloat(e.points) + (userEvaluation.points * 1)
      })
      this.toast.success('Auto avaliação sobre ' + this.userEvaluation.evaluation.name + ' no Dominio ' + this.userEvaluation.evaluation.group + ' feito com successo para ' + this.userEvaluation.requester.datas.fullName, 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
      this.closeModal('self-evaluation-modal')
    })
  }

  saveEvaluationComent(){
    this.userEvaluation.descriptions
    this.closeModal('evaluation-modal')
  }
  selectRequest(item: EvaluationRequest) {
    this.request = item;
    this.openModal('evaluation-modal')
  }

  makeEvaluation(e: Evaluation) {
    if (e.points > 0) return;
    this.currentEvaluation = e;
    this.openModal('self-evaluation-modal')
  }
  getCurentEvaluation(e: Evaluation) {
    let u = this.requests.map(m => m.evaluations)[0]

    let f = u.filter(h => h.evaluation.id == e.id)
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
    return s.includes('http') ? s : this.auth.serverAdresss + '/' + s
  }
}
