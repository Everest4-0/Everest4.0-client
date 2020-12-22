import { QuizComponent } from './../../frontoffice/quiz/quiz.component';
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

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';

// SwiperOptions from 'swiper' could also be used here instead of SwiperConfigInterface
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

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
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    ModalModule,
    MomentModule,
    FullCalendarModule,
    SwiperModule,
    FlexLayoutModule,
    
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl/*, useClass: MyIntl */ },
      formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    }),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' }),

  ],
  declarations: [
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

    //QuizComponent,

    ScheduleComponent,
    CalendarComponent,
    GroupByPipe,
    ArrSumPipe,
    ArrFilterPipe
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})

export class AdminLayoutModule { }
