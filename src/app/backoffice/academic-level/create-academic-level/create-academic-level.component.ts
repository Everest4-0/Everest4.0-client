import { AcademicLevelForm } from './../../forms/academicLevel.form';
import { FormBuilder } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicLevelService } from './../../../services/data/academic-level.service';
import { AcademicLevel } from './../../../models/backoffice/academicLevel.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-academic-level',
  templateUrl: './create-academic-level.component.html',
  styleUrls: ['./create-academic-level.component.css']
})
export class CreateAcademicLevelComponent implements OnInit {

  public form = new AcademicLevelForm(this.fb);

  public academicLevel: AcademicLevel = new AcademicLevel()
  
  constructor(private academicLevelService: AcademicLevelService,
              private fb:FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService) { }

  ngOnInit(): void {
  }
  
  saveForm() {
    this.academicLevelService.create(this.academicLevel).subscribe(evaluation => {
      this.toast.success('Nível académico criado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/academic_levels']);
    })
  }
}
