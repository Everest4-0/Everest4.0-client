import { CoachRoutes } from './coach.routing';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    RouterModule.forChild(CoachRoutes)
  ]
})
export class CoachModule { }
