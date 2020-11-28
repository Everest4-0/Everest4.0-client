import { GoalsComponent } from './../../frontoffice/goals/goals/goals.component';
import { UserHomeComponent } from './../../frontoffice/user/user-home/user-home.component';
import { UserDetailsComponent } from './../../frontoffice/user/user-details/user-details.component';
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
    { path: 'dashboard',      component: HomeComponent },
    { path: 'diagnostic',     component: DiagnosticComponent },
    { path: 'goals',          component: GoalsComponent },
    { path: 'user',           component: UserHomeComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },

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
