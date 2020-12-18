import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { WorkSituationService } from './../../../services/data/work-situation.service';
import { WorkSituationForm } from './../../forms/workSituation.form';
import { Component, OnInit } from '@angular/core';
import { WorkSituation } from 'app/models/backoffice/workSituation.model';

@Component({
  selector: 'app-create-work-situation',
  templateUrl: './create-work-situation.component.html',
  styleUrls: ['./create-work-situation.component.css']
})
export class CreateWorkSituationComponent implements OnInit {

  public form = new WorkSituationForm(this.fb);

  public workSituation: WorkSituation = new WorkSituation()
  
  constructor(private workSituationService: WorkSituationService,
              private fb:FormBuilder,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit(): void {
  }

  saveForm() {
    this.workSituationService.create(this.workSituation).subscribe(data => {
      this.toast.success('Situação de trabalho criado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/work_situations']);
    })
  }

}
