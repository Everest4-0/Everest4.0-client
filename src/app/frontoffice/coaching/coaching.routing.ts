import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { ClientBoardComponent } from './client-board/client-board.component';
import { CoachingComponent } from './coaching/coaching.component';

import { Routes } from '@angular/router';

export const CoachingRoutes: Routes = [
    {
        path: '', component: CoachingDashboardComponent
    },
    {
        path: 'board', component: ClientBoardComponent
    }
]; 