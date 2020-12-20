import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProfessionalExperienceForm } from './../../forms/professionalExperience.form';
import { Component, OnInit } from '@angular/core';
import { ProfessionalExperience } from 'app/models/backoffice/professionalExperience.model';
import { ProfessionalExperienceService } from 'app/services/data/professional-experience.service';

@Component({
  selector: 'app-update-professional-experience',
  templateUrl: './update-professional-experience.component.html',
  styleUrls: ['./update-professional-experience.component.css']
})
export class UpdateProfessionalExperienceComponent implements OnInit {

  public form = new ProfessionalExperienceForm(this.fb)
  public professionalExperience: ProfessionalExperience = new ProfessionalExperience()

  constructor(private professionalExperienceService:ProfessionalExperienceService,
              private fb:FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService
              ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id']

    this.professionalExperienceService.one(id).subscribe(data=>this.professionalExperience=data)

    console.log(this.form)
  }

  saveForm(){
    this.professionalExperienceService.update(this.professionalExperience).subscribe(data=>{

      this.toast.success('Experiência profissional actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/professional-experiencies']);

    })
  }

}
