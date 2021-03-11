import { CoachingComponent } from './coaching/coaching.component';
import { CoachingRoutes } from './coaching.routing';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticViewComponent } from './diagnostic-view/diagnostic-view.component';
import { ClientBoardComponent } from './client-board/client-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { CoachingEvolutionComponent } from './coaching-evolution/coaching-evolution.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [
    CoachingComponent, 
    DiagnosticViewComponent, 
    ClientBoardComponent, CoachingDashboardComponent, CoachingEvolutionComponent, ChatComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingModule { }
