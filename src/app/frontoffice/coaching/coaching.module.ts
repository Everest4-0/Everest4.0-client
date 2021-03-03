import { CoachingComponent } from './coaching/coaching.component';
import { CoachingRoutes } from './coaching.routing';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticViewComponent } from './diagnostic-view/diagnostic-view.component';



@NgModule({
  declarations: [CoachingComponent, DiagnosticViewComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingModule { }
