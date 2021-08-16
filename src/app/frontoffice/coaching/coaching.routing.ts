import { ProgramEnrollmentComponent } from 'app/backoffice/coaching-backoffice/program-enrollment/program-enrollment.component';

import { ClientBoardComponent } from 'app/frontoffice/coaching/client-board/client-board.component';


import { Routes } from '@angular/router';
import { CoachingDashboardComponent } from 'app/frontoffice/coaching/coaching-dashboard/coaching-dashboard.component';

export const CoachingRoutes: Routes = [
    {
        path: '', component: CoachingDashboardComponent
    },
    {
        path: 'board/:id', component: ClientBoardComponent
    },
    {
        path: 'program-enrolling/:id', component: ProgramEnrollmentComponent
    }
]; 