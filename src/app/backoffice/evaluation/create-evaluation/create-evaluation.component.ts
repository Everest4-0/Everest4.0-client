import { EvaluationForm } from './../../forms/evaluation.from';
import { Evaluation } from './../../../models/diagnostic/evaluation';
import { FormBuilder } from '@angular/forms';
import { EvaluationService } from './../../../services/evaluation.service';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent implements OnInit {

  public form = new EvaluationForm(this.fb)
  public evaluation: Evaluation = new Evaluation();
  constructor(
    private fb: FormBuilder,
    private evaluationService: EvaluationService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit(): void {}

  saveForm() {
    this.evaluationService.create(this.evaluation).subscribe(evaluation => {
      this.toast.success('Vaiavel criada com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/evaluations']);
    })
  }

}