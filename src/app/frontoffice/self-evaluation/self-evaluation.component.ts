import { take } from 'rxjs/operators';
import { ToastService } from 'ng-uikit-pro-standard';
import { Evaluation } from 'app/models/diagnostic/evaluation';
import { AuthService } from './../../services/auth.service';
import { UserEvaluationService } from './../../services/user-evaluation.service';
import { EvaluationService } from './../../services/evaluation.service';
import { ModalService } from './../../components/modal/modal.service';
import { UserEvaluation } from 'app/models/diagnostic/user-evaluation';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-self-evaluation',
  templateUrl: './self-evaluation.component.html',
  styleUrls: ['./self-evaluation.component.scss']
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
    private auth: AuthService,
    private toast: ToastService) {
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
    if (v.points > 0) {
      this.toast.warning('Já foi feita auto avaliação sobre ' + v.name + ' no Dominio ' + v.group + ' Aguarde próximo ciclo ou contacte o apoio ao cliente',
        'Atenção', {
        timeOut: 5000,
      })
      return;
    };
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
  cleanEvaluation(){
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {

    })
  }
  saveEvaluation() {
    this.userEvaluationService.create(this.currentEvaluation).subscribe(e => {
      this.evaluations.forEach(x => {
        if (x.id == e.evaluationId)
          x.points = e.points
      })

      this.currentEvaluation.requested = this.currentEvaluation.requester = this.auth.user
      this.toast.success('Auto avaliação sobre ' + this.currentEvaluation.evaluation.name + ' no Dominio ' + this.currentEvaluation.evaluation.group + ' feito com successo', 'Sucesso', {
        timeOut: 50000,
        progressBar: true,
      })
      this.currentEvaluation = new UserEvaluation();

      this.currentEvaluation.requester = this.currentEvaluation.requested = this.auth.user
    })
    this.modalService.close('self-evaluation-modal');
  }

}
