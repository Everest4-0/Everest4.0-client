import { SelfEvaluationService } from './../../services/self-evaluation.service';
import { SelfEvaluation } from './../../models/self-evaluation';
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
  selfEvaluations: Array<SelfEvaluation> = []
  currentSelfEvaluations: SelfEvaluation = new SelfEvaluation();

  constructor(private modalService: ModalService, private selfEvaluationService: SelfEvaluationService) {
  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';

    this.selfEvaluationService.all().subscribe(selfEvaluations => this.selfEvaluations = this.groupBy(selfEvaluations,'group'))

  }
  groupBy(xs, key) {
    let final= xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});


    return Object.keys(final).map((k) => [k, final[k]]);
  };
  openModal(id: string,v:SelfEvaluation) {
      this.currentSelfEvaluations=v
      this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
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
