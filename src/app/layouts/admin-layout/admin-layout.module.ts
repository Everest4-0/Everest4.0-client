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
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    LbdModule,
    ModalModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
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
    GroupByPipe,
    ArrSumPipe,
    ArrFilterPipe
  ]
})

export class AdminLayoutModule {}
