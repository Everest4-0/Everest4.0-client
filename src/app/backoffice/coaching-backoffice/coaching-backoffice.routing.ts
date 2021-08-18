import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProgramEnrollmentComponent } from 'app/backoffice/coaching-backoffice/program-enrollment/program-enrollment.component';
import { ManagerBoardComponent } from 'app/backoffice/coaching-backoffice/manager-board/manager-board.component';
import { CoachingBackOfficeDashboardComponent } from 'app/backoffice/coaching-backoffice/coaching-dashboard/coaching-backoffice-dashboard.component';
import { Routes } from '@angular/router';
import { VirtualDataroomComponent } from 'app/components/virtual-dataroom/virtual-dataroom.component';

export const CoachingRoutes: Routes = [
    {
        path: 'start', component: CoachingBackOfficeDashboardComponent,
        
    },
    {
        path: 'board/m/:id', component: ManagerBoardComponent
    },
    {
        path: 'virtual-dataroom', component: VirtualDataroomComponent
    },
    {
        path: 'program/enrolled/:id', component: ProgramEnrollmentComponent
    }
];
