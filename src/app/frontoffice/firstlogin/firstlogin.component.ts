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
  public user: User = new User()
  public file: any = {}
  currentStep: Observable<StepModel>;
  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private stepsService: FormStepsService,
    private router: Router
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
    this.router.navigate(['/complete']);
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
      };
    }
  } onFileDropped($event) {
    this.onChange($event[0]);
  }
}
