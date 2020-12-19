import { ProfessionalExperienceService } from './../../../services/data/professional-experience.service';
import { Component, OnInit } from '@angular/core';
import { ProfessionalExperience } from 'app/models/backoffice/professionalExperience.model';

@Component({
  selector: 'app-list-professional-experience',
  templateUrl: './list-professional-experience.component.html',
  styleUrls: ['./list-professional-experience.component.css']
})
export class ListProfessionalExperienceComponent implements OnInit {

  public professionalExperiencies: Array<ProfessionalExperience>=[]

  constructor(private professionalService: ProfessionalExperienceService,
              ) { }

  ngOnInit(): void {
    this.professionalService.all({}).subscribe(datas=>this.professionalExperiencies=datas)
  }

}
