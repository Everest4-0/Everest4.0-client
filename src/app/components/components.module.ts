import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoachingFeedbackComponent } from './coaching-feedback/coaching-feedback.component';
import { CoachingNoteComponent } from './coaching-note/coaching-note.component';

import { DiagnosticViewComponent } from './diagnostic-view/diagnostic-view.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScheduleComponent } from './schedule/schedule.component';
import { CalendarComponent } from './calendar/calendar.component';
import { TaskComponent } from './task/task.component';
import { RatingComponent } from './rating/rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ModalModule } from './modal';
import { PipesModule } from 'app/pipes/pipes.module';
import { MomentModule } from 'ngx-moment';
import { CoachingEvolutionComponent } from './coaching-evolution/coaching-evolution.component';



@NgModule({
  declarations: [
    ProgressBarComponent,
    RatingComponent,

    TaskComponent,
    CalendarComponent,
    ScheduleComponent,
    
    CoachingNoteComponent,
    DiagnosticViewComponent,
    CoachingFeedbackComponent,
    CoachingEvolutionComponent,
  ],
  imports: [
    MomentModule,
    ModalModule,
    PipesModule,

    FormsModule,
    ReactiveFormsModule,

    CommonModule,
    FullCalendarModule,

  ],
  exports:[
    ProgressBarComponent,
    RatingComponent,

    TaskComponent,
    CalendarComponent,
    ScheduleComponent,

    CoachingNoteComponent,
    DiagnosticViewComponent,
    CoachingFeedbackComponent,
    CoachingEvolutionComponent,
  ]
})
export class ComponentsModule { }