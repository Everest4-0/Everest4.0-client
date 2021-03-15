import { ManagerBoardComponent } from './manager-board/manager-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { Routes } from '@angular/router';

export const CoachingRoutes: Routes = [
    {
        path: '', component: CoachingDashboardComponent
    },
    {
        path: 'board/:id', component: ManagerBoardComponent
    }
]; 