import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { Evaluation } from './../../../models/diagnostic/evaluation';
import { EvaluationService } from './../../../services/evaluation.service';
import { EvaluationForm } from './../../forms/evaluation.from';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-evaluation',
  templateUrl: './update-evaluation.component.html',
  styleUrls: ['./update-evaluation.component.scss']
})
export class UpdateEvaluationComponent implements OnInit {

  public form = new EvaluationForm(this.fb)
  public evaluation: Evaluation = new Evaluation();
  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.evaluationService.one(id).subscribe(evaluation => this.evaluation = evaluation)
  }

  saveForm(t={}) {
    this.evaluationService.update(this.evaluation).subscribe(evaluation => {
      this.toast.success('Vaiavel actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/evaluations']);
    })
  }

}
