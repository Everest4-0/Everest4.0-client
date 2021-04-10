import { ProfessionalExperienceService } from './../../services/data/professional-experience.service';
import { WorkSituationService } from './../../services/data/work-situation.service';
import { AcademicLevelService } from './../../services/data/academic-level.service';
import { StorageServices } from './../../services/storage.service';
import Swal from 'sweetalert2'
import { FormStepsService } from './../../services/form-steps.service';
import { Observable } from 'rxjs';
import { StepModel } from './../../models/step-model';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/main/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  isvalid = {};
  public user: User = new User()
  public file: any = {}
  currentStep: Observable<StepModel>;

  academicLevels: Array<any> = [];
  workSituations: Array<any> = [];
  professionalExperiences: Array<any> = [];
  activitySectors: Array<any> = [{ id: 2, name: 'Público' }, { id: 1, name: 'Privado' }, { id: 0, name: 'Outro' }]
  sexs: Array<any> = [{ id: 2, name: 'Masculino' }, { id: 1, name: 'Feminino' }, { id: 0, name: 'Outro' }]
  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    photoUrl: [''],
    telephone: [''],
    birthDate: [''],
    sex: [''],

    salary: [''],
    academicLevel: [''],
    workSituation: [''],
    professionalExperience: [''],

    activitySector: [''],
  });

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private stepsService: FormStepsService,
    private router: Router,
    private store: StorageServices,

    private academicLevelService: AcademicLevelService,
    private workSituationService: WorkSituationService,
    private professionalExperienceService: ProfessionalExperienceService
  ) {
    this.user = this.auth.user;
  }

  ngOnInit(): void {

    this.academicLevelService.all().subscribe(x => this.academicLevels = x)
    this.workSituationService.all().subscribe(x => this.workSituations = x)
    this.professionalExperienceService.all().subscribe(x => this.professionalExperiences = x)

    this.file.imageUrl = this.auth.user.avatar
    this.currentStep = this.stepsService.getCurrentStep();
  }
  formValid(e) {
    this.isvalid = { ...this.isvalid, ...e }
    let final = Object.keys(this.isvalid).map(key => {
      return this.isvalid[key];
    });
    //this.currentStep.subscribe(r=>r.isComplete = e);
  };

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Seguinte' : 'Salvar';
  }

  onSubmit(): void {
    this.auth.update(this.user).subscribe(user => {
      this.auth.authenticate(user, () => {

        Swal.fire(
          'Sucesso!',
          'Seja bem vindo ao Everes4.0',
          'success'
        )

        window.open('./', '_self')
      });
      this.dismiss.emit('');
    })
  }

  close = () => this.dismiss.emit('');


  onChange(file: File) {
    
    if (file) {
      this.file.fileName = file.name;
      this.file.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.file.imageUrl = reader.result;
        this.user.photoUrl = this.file.imageUrl;
      };
    }
  } 
  onFileDropped($event) {
    this.onChange($event[0]);
  }
}
