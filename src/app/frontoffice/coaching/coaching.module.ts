import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './../../components/modal/modal.module';
import { CoachingComponent } from './coaching/coaching.component';
import { CoachingRoutes } from './coaching.routing';

import { MomentModule } from 'ngx-moment';

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticViewComponent } from './diagnostic-view/diagnostic-view.component';
import { ClientBoardComponent } from './client-board/client-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { CoachingEvolutionComponent } from './coaching-evolution/coaching-evolution.component';
import { ChatComponent } from './chat/chat.component';
import { CoachingNoteComponent } from './coaching-note/coaching-note.component';
import { CoachingFeedbackComponent } from './coaching-feedback/coaching-feedback.component';



@NgModule({
  declarations: [
    CoachingComponent, 
    DiagnosticViewComponent, 
    ClientBoardComponent,
    CoachingDashboardComponent,
    CoachingEvolutionComponent,
    ChatComponent,
    CoachingNoteComponent,
    CoachingFeedbackComponent],
  imports: [
    CommonModule, 
    ModalModule,

    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CoachingRoutes)
  ]
})
export class CoachingModule { }
