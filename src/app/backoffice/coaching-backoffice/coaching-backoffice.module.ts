import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachingComponent } from './coaching/coaching.component';
import { ManagerBoardComponent } from './manager-board/manager-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { CoachingRoutes } from '../coaching-backoffice/coaching-backoffice.routing';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [CoachingComponent, ManagerBoardComponent, CoachingDashboardComponent],
  imports: [
    CommonModule,
    MomentModule,
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingBackofficeModule { }
