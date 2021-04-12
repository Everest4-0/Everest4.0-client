import { ProgramEnrollmentComponent } from './program-enrollment/program-enrollment.component';
import { ManagerBoardComponent } from './manager-board/manager-board.component';
import { CoachingDashboardComponent } from './coaching-dashboard/coaching-dashboard.component';
import { Routes } from '@angular/router';
import { VirtualDataroomComponent } from 'app/components/virtual-dataroom/virtual-dataroom.component';

export const CoachingRoutes: Routes = [
    {
        path: '', component: CoachingDashboardComponent
    },
    {
        path: 'board/:id', component: ManagerBoardComponent
    },
    {
        path: 'virtual-dataroom', component: VirtualDataroomComponent
    },
    {
        path: 'program/enrolled/:id', component: ProgramEnrollmentComponent
    }
]; 