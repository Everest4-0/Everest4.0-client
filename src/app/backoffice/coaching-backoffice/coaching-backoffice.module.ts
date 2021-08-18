import { ComponentsModule } from './../../components/components.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachingComponent } from './coaching/coaching.component';
import { ManagerBoardComponent } from './manager-board/manager-board.component';
import { CoachingBackOfficeDashboardComponent } from './coaching-dashboard/coaching-backoffice-dashboard.component';
import { CoachingRoutes } from 'app/backoffice/coaching-backoffice/coaching-backoffice.routing';
import { MomentModule } from 'ngx-moment';
import { ProgramEnrollmentComponent } from './program-enrollment/program-enrollment.component';


@NgModule({
  declarations: [CoachingComponent, ManagerBoardComponent, CoachingBackOfficeDashboardComponent, ProgramEnrollmentComponent],
  imports: [
    CommonModule,
    MomentModule,
    ComponentsModule,
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingBackofficeModule { }
