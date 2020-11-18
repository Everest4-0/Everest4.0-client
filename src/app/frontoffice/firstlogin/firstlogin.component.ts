import { StorageServices } from './../../services/storage.service';
import Swal from 'sweetalert2'
import { FormStepsService } from './../../services/form-steps.service';
import { Observable } from 'rxjs';
import { StepModel } from './../../models/step-model';
import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/user';
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
  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private stepsService: FormStepsService,
    private router: Router,
    private store: StorageServices
  ) {
    this.user = this.auth.user;
  }

  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    photoUrl: [''],
    telephone: ['']
  });
  ngOnInit(): void {
    this.file.imageUrl = this.auth.user.photoUrl
    this.currentStep = this.stepsService.getCurrentStep();
  }
  formValid(e) {
    this.isvalid = { ...this.isvalid, ...e }
    debugger
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
    return !this.stepsService.isLastStep() ? 'Continue' : 'Finish';
  }

  onSubmit(): void {
    this.auth.update(this.user).subscribe(user => {
      this.auth.user = user;
      this.store.save('current_user', user);
      Swal.fire(
        'Good job!',
        'Seja bem vindo ao Everes4.0',
        'success'
      )
      this.dismiss.emit('');
    })
    Swal.fire(
      'Good job!',
      'submited',
      'success'
    )
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
  } onFileDropped($event) {
    this.onChange($event[0]);
  }
}
