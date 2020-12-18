import { ToastService } from 'ng-uikit-pro-standard';
import { AcademicLevelService } from './../../../services/data/academic-level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AcademicLevel } from './../../../models/backoffice/academicLevel.model';
import { AcademicLevelForm } from './../../forms/academicLevel.form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-academic-level',
  templateUrl: './update-academic-level.component.html',
  styleUrls: ['./update-academic-level.component.css']
})
export class UpdateAcademicLevelComponent implements OnInit {

  public form = new AcademicLevelForm(this.fb)
  public academicLevel: AcademicLevel = new AcademicLevel()

  constructor(private academicLevelService:AcademicLevelService,
              private fb:FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService
              ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id']

    this.academicLevelService.one(id).subscribe(data=>this.academicLevel=data)
  }

  saveForm(){
    this.academicLevelService.update(this.academicLevel).subscribe(data=>{
      this.toast.success('Nível académico actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })
      this.router.navigate(['/backoffice/academic_levels']);
    })
  }

}
