import { QuizSolveFormComponent } from './quiz/quiz-solve-form/quiz-solve-form.component';
import { ListQuizComponent } from './quiz/list-quiz/list-quiz.component';
import { UserSecurityComponent } from './user/user-security/user-security.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { HelpdeskComponent } from './helpdesk/helpdesk.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { VacantJobComponent } from './vacant-job/vacant-job.component';
import { CoachingComponent } from './coaching/coaching.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CounterDirective } from './../directive/counter.directive';
import { ActivityTaskComponent } from './courses/activity-task/activity-task.component';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';


import { PipesModule } from './../pipes/pipes.module';
import { ArrSortPipe } from './../pipes/arr-sort.pipe';
import { ActivityCourseComponent } from './courses/activity-course/activity-course.component';
import { EnrollingCourseComponent } from './courses/enrolling-course/enrolling-course.component';
import { ForbidenComponent } from './costum/forbiden/forbiden.component';
import { DetailsCourseComponent } from './courses/details-course/details-course.component';
import { ListCourseComponent } from './courses/list-course/list-course.component';
import { UserSettingsComponent } from './user/user-settings/user-settings.component';
import { TaskComponent } from './goals/task/task.component';

import { MomentModule } from 'ngx-moment';
import { CalendarComponent } from './goals/calendar/calendar.component';
import { ScheduleComponent } from './goals/schedule/schedule.component';
import { BudgetsComponent } from './goals/budgets/budgets.component';
import { PlansComponent } from './goals/plans/plans.component';
import { ResultsComponent } from './goals/results/results.component';
import { GoalsComponent } from './goals/goals/goals.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { ArrFilterPipe } from './../pipes/arr-filter.pipe';
import { EvaluationRequestComponent } from './evaluation-request/evaluation-request.component';
import { FeedbackEvaluationComponent } from './feedback-evaluation/feedback-evaluation.component';
import { SelfEvaluationComponent } from './self-evaluation/self-evaluation.component';
import { ArrSumPipe } from './../pipes/arr-sum.pipe';
import { GroupByPipe } from './../pipes/group-by.pipe';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { RatingComponent } from './../components/rating/rating.component';

import { DiagnosticComponent } from './diagnostic/diagnostic.component';
import { ModalModule } from './../components/modal';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../components/lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';

import { FrontOfficeRoutes } from './frontoffice.routing';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './../user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { CountdownModule } from 'ngx-countdown';


FullCalendarModule.registerPlugins([
  listPlugin,
  interactionPlugin,
  dayGridPlugin,
  timeGridPlugin,
  bootstrapPlugin
]);
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FrontOfficeRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    ModalModule,
    MomentModule,
    FullCalendarModule,
    FlexLayoutModule,
    PipesModule,
    CountdownModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl/*, useClass: MyIntl */ },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' }),
    NgxYoutubePlayerModule.forRoot(),

    PdfViewerModule,

    //NgxPermissionsModule.forRoot(),
  ],
  declarations: [
    CounterDirective,
    DiagnosticComponent,
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    RatingComponent,
    ProgressBarComponent,
    SelfEvaluationComponent,
    FeedbackEvaluationComponent,
    EvaluationRequestComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserHomeComponent,
    GoalsComponent,
    ResultsComponent,
    PlansComponent,
    BudgetsComponent,
    TaskComponent,
    NewsListComponent,
    UserSettingsComponent,
    UserSecurityComponent,

    EnrollingCourseComponent,
    ActivityCourseComponent,

    ActivityTaskComponent,
    ForbidenComponent,

    ScheduleComponent,
    CalendarComponent,

    ListCourseComponent,
    DetailsCourseComponent,


    CoachingComponent,
    VacantJobComponent,
    HelpdeskComponent,
    MonitoringComponent,

    ListQuizComponent,
    QuizSolveFormComponent
  ],
  exports: [
  ],
  providers: [
  ]
})

export class FrontofficeModule { }

