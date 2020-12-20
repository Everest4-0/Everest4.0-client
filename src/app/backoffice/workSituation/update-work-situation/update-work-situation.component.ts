import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { WorkSituationService } from './../../../services/data/work-situation.service';
import { WorkSituationForm } from './../../forms/workSituation.form';
import { Component, OnInit } from '@angular/core';
import { WorkSituation } from 'app/models/backoffice/workSituation.model';

@Component({
  selector: 'app-update-work-situation',
  templateUrl: './update-work-situation.component.html',
  styleUrls: ['./update-work-situation.component.css']
})
export class UpdateWorkSituationComponent implements OnInit {

  public form = new WorkSituationForm(this.fb)
  public workSituation: WorkSituation = new WorkSituation()

  constructor(private workSituationService:WorkSituationService,
              private fb:FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService
              ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id']

    this.workSituationService.one(id).subscribe(data=>this.workSituation=data)

    console.log(this.form)
  }

  saveForm(){
    this.workSituationService.update(this.workSituation).subscribe(data=>{

      this.toast.success('Situação de trabalho actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/work_situations']);

    })
  }

}
