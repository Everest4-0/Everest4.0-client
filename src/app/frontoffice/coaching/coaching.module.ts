import { ComponentsModule } from 'app/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './../../components/modal/modal.module';
import { CoachingComponent } from './coaching/coaching.component';
import { CoachingRoutes } from './coaching.routing';

import { MomentModule } from 'ngx-moment';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientBoardComponent } from './client-board/client-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { ProgramEnrollmentComponent } from './program-enrollment/program-enrollment.component';

@NgModule({
  declarations: [
    CoachingComponent, 
    ClientBoardComponent,
    CoachingDashboardComponent,
    ProgramEnrollmentComponent
  ],
  imports: [
    CommonModule, 

    ComponentsModule,
    ModalModule,

    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingModule { }
