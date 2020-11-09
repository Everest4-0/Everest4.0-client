import { FormStepsService } from './../../services/form-steps.service';
import { StepModel } from './../../models/step-model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepsComponent implements OnInit {

  steps: Observable<StepModel[]>;
  currentStep: Observable<StepModel>;

  constructor(private stepsService: FormStepsService) { }

  ngOnInit(): void {
    this.steps = this.stepsService.getSteps();
    this.currentStep = this.stepsService.getCurrentStep();
  }

  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }
}
