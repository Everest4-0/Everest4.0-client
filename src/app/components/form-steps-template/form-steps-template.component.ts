import { StepModel } from './../../models/step-model';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form-steps-template',
  templateUrl: './form-steps-template.component.html',
  styleUrls: ['./form-steps-template.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormStepsTemplateComponent implements OnInit {


  @Input() step: StepModel;

  constructor() { }

  ngOnInit(): void {
    this.step.isComplete = true;
  }

  onCompleteStep() {
    this.step.isComplete = true;
  }

}