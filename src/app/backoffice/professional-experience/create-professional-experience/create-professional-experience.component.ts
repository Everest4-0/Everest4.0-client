import { ToastService } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProfessionalExperienceService } from './../../../services/data/professional-experience.service';
import { ProfessionalExperience } from './../../../models/backoffice/professionalExperience.model';
import { ProfessionalExperienceForm } from './../../forms/professionalExperience.form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-professional-experience',
  templateUrl: './create-professional-experience.component.html',
  styleUrls: ['./create-professional-experience.component.css']
})
export class CreateProfessionalExperienceComponent implements OnInit {

  public form = new ProfessionalExperienceForm(this.fb);

  public professionalExperience: ProfessionalExperience = new ProfessionalExperience()
  
  constructor(private professionalExperienceService: ProfessionalExperienceService,
              private fb:FormBuilder,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit(): void {
  }

  saveForm() {
    this.professionalExperienceService.create(this.professionalExperience).subscribe(data => {
      this.toast.success('Experiência de profissional criado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/professional-experiencies']);
    })
  }

}
