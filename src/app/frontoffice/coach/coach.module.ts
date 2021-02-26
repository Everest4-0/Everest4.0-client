import { CoachRoutes } from './coach.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coach/coach.component';



@NgModule({
  declarations: [CoachComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(CoachRoutes)
  ]
})
export class CoachModule { }
