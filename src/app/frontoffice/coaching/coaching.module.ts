import { CoachingComponent } from './coaching/coaching.component';
import { CoachingRoutes } from './coaching.routing';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [CoachingComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingModule { }
