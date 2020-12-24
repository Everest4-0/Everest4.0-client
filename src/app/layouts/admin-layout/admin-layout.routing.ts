import { DetailsCourseComponent } from './../../frontoffice/courses/details-course/details-course.component';
import { ListCourseComponent } from './../../frontoffice/courses/list-course/list-course.component';
import { CreateQuizComponent } from './../../frontoffice/quiz/quiz/create-quiz/create-quiz.component';
import { ListQuizComponent } from './../../frontoffice/quiz/quiz/list-quiz/list-quiz.component';
import { QuizComponent } from './../../frontoffice/quiz/quiz.component';
import { GoalsComponent } from './../../frontoffice/goals/goals/goals.component';
import { UserHomeComponent } from './../../frontoffice/user/user-home/user-home.component';


import { FormStepsCompleteComponent } from './../../components/form-steps-complete/form-steps-complete.component';
import { FormStepsComponent } from './../../components/form-steps/form-steps.component';
import { DiagnosticComponent } from './../../frontoffice/diagnostic/diagnostic.component';
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',             component: HomeComponent },
    { path: 'diagnostic',            component: DiagnosticComponent },
    { path: 'quiz',                  component: QuizComponent },
    { path: 'goals',                 component: GoalsComponent },
    { path: 'user',                  component: UserHomeComponent },
    { path: 'table',                 component: TablesComponent },
    { path: 'typography',            component: TypographyComponent },
    { path: 'icons',                 component: IconsComponent },
    { path: 'maps',                  component: MapsComponent },
    { path: 'notifications',         component: NotificationsComponent },
    { path: 'upgrade',               component: UpgradeComponent },
    { path: 'quiz/quizes',           component: ListQuizComponent},
    { path: 'quiz/quizes/create',    component: CreateQuizComponent},

    { path: 'courses',  component: ListCourseComponent},
    { path: 'courses/details/:id',  component: DetailsCourseComponent},


    {
        path: 'form',
        component: FormStepsComponent
      },
      {
        path: 'complete',
        component: FormStepsCompleteComponent
      },
      {
        path: '',
        redirectTo: '/form',
        pathMatch: 'full'
      }
];
