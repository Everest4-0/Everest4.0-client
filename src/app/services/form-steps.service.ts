import { StepModel } from './../models/step-model';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


const STEPS = [
  { stepIndex: 1, isComplete: false },
  { stepIndex: 2, isComplete: false },
  { stepIndex: 3, isComplete: false }
];

@Injectable({
  providedIn: 'root'
})
export class FormStepsService {
  s: Array<any> = []
  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(STEPS);
  currentStep$: BehaviorSubject<StepModel> = new BehaviorSubject<StepModel>(null);

  constructor() {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
  }

  getCurrentStep(): Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(n: number=6): Observable<StepModel[]> {
    for (let i = 0; i < n; i++)
      this.s.push({ stepIndex: i+1, isComplete: false })
    this.steps$ = new BehaviorSubject<StepModel[]>(this.s);
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value.stepIndex;

    if (index < this.steps$.value.length) {
      this.currentStep$.next(this.steps$.value[index]);
    }
  }

  isLastStep(): boolean {
    return this.currentStep$.value.stepIndex === this.steps$.value.length;
  }
}