import { HelpdeskComponent } from './../../frontoffice/helpdesk/helpdesk.component';
import { MonitoringComponent } from './../../frontoffice/monitoring/monitoring.component';
import { VacantJobComponent } from './../../frontoffice/vacant-job/vacant-job.component';
import { CoachingComponent } from './../../frontoffice/coaching/coaching.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CounterDirective } from './../../directive/counter.directive';
import { ActivityTaskComponent } from './../../frontoffice/courses/activity-task/activity-task.component';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';


import { PipesModule } from './../../pipes/pipes.module';
import { ArrSortPipe } from './../../pipes/arr-sort.pipe';
import { ActivityCourseComponent } from './../../frontoffice/courses/activity-course/activity-course.component';
import { EnrollingCourseComponent } from './../../frontoffice/courses/enrolling-course/enrolling-course.component';
import { ForbidenComponent } from './../../frontoffice/costum/forbiden/forbiden.component';
import { DetailsCourseComponent } from './../../frontoffice/courses/details-course/details-course.component';
import { ListCourseComponent } from './../../frontoffice/courses/list-course/list-course.component';
import { UserSettingsComponent } from './../../frontoffice/user/user-settings/user-settings.component';
import { UserSecurityComponent } from '../../frontoffice/user/user-security/user-security.component';
import { NewsListComponent } from './../../frontoffice/news/news-list/news-list.component';
import { TaskComponent } from './../../frontoffice/goals/task/task.component';

import { MomentModule } from 'ngx-moment';
import { CalendarComponent } from './../../frontoffice/goals/calendar/calendar.component';
import { ScheduleComponent } from './../../frontoffice/goals/schedule/schedule.component';
import { BudgetsComponent } from './../../frontoffice/goals/budgets/budgets.component';
import { PlansComponent } from './../../frontoffice/goals/plans/plans.component';
import { ResultsComponent } from './../../frontoffice/goals/results/results.component';
import { GoalsComponent } from './../../frontoffice/goals/goals/goals.component';
import { UserHomeComponent } from './../../frontoffice/user/user-home/user-home.component';
import { UserDetailsComponent } from './../../frontoffice/user/user-details/user-details.component';
import { UserEditComponent } from './../../frontoffice/user/user-edit/user-edit.component';
import { ArrFilterPipe } from './../../pipes/arr-filter.pipe';
import { EvaluationRequestComponent } from './../../frontoffice/evaluation-request/evaluation-request.component';
import { FeedbackEvaluationComponent } from './../../frontoffice/feedback-evaluation/feedback-evaluation.component';
import { SelfEvaluationComponent } from './../../frontoffice/self-evaluation/self-evaluation.component';
import { ArrSumPipe } from './../../pipes/arr-sum.pipe';
import { GroupByPipe } from './../../pipes/group-by.pipe';
import { ProgressBarComponent } from './../../components/progress-bar/progress-bar.component';
import { RatingComponent } from './../../components/rating/rating.component';

import { DiagnosticComponent } from './../../frontoffice/diagnostic/diagnostic.component';
import { ModalModule } from './../../components/modal';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../components/lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../frontoffice/home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../frontoffice/tables/tables.component';
import { TypographyComponent } from '../../frontoffice/typography/typography.component';
import { IconsComponent } from '../../frontoffice/icons/icons.component';
import { MapsComponent } from '../../frontoffice/maps/maps.component';
import { NotificationsComponent } from '../../frontoffice/notifications/notifications.component';
import { UpgradeComponent } from '../../frontoffice/upgrade/upgrade.component';
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
    MonitoringComponent
  ],
  exports:[
  ],
  providers: [
  ]
})

export class AdminLayoutModule { }
