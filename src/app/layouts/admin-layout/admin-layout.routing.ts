import { HelpdeskComponent } from './../../frontoffice/helpdesk/helpdesk.component';
import { MonitoringComponent } from './../../frontoffice/monitoring/monitoring.component';
import { VacantJobComponent } from './../../frontoffice/vacant-job/vacant-job.component';
import { CoachingComponent } from './../../frontoffice/coaching/coaching.component';
import { DetailsQuizComponent } from './../../frontoffice/quiz/details-quiz/details-quiz.component';
import { UpdateQuizComponent } from './../../frontoffice/quiz/update-quiz/update-quiz.component';
import { DeleteQuizComponent } from './../../frontoffice/quiz/delete-quiz/delete-quiz.component';
import { EnrollingCourseComponent } from './../../frontoffice/courses/enrolling-course/enrolling-course.component';
import { ForbidenComponent } from './../../frontoffice/costum/forbiden/forbiden.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DetailsCourseComponent } from './../../frontoffice/courses/details-course/details-course.component';
import { ListCourseComponent } from './../../frontoffice/courses/list-course/list-course.component';
import { CreateQuizComponent } from '../../frontoffice/quiz/create-quiz/create-quiz.component';
import { ListQuizComponent } from '../../frontoffice/quiz/list-quiz/list-quiz.component';
import { GoalsComponent } from './../../frontoffice/goals/goals/goals.component';
import { UserHomeComponent } from './../../frontoffice/user/user-home/user-home.component';


import { FormStepsCompleteComponent } from './../../components/form-steps-complete/form-steps-complete.component';
import { FormStepsComponent } from './../../components/form-steps/form-steps.component';
import { DiagnosticComponent } from './../../frontoffice/diagnostic/diagnostic.component';
import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

export const AdminLayoutRoutes: Routes =
  [
    {
      path: '403', component: ForbidenComponent
    },

    {
      path: 'dashboard', component: HomeComponent,
      // canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'diagnostic', component: DiagnosticComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'goals', component: GoalsComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'coaching', component: CoachingComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['PRO'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'vacant-n-jobs', component: VacantJobComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['PRO'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'helpdesk', component: HelpdeskComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['PRO','BASIC','FREE'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'monitoring', component: MonitoringComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['PRO','BASIC'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'user', component: UserHomeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'table', component: TablesComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'typography', component: TypographyComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'icons', component: IconsComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'maps', component: MapsComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'notifications', component: NotificationsComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'upgrade', component: UpgradeComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },{
      path: 'quizes', component: ListQuizComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    }, {
      path: 'quiz/quizes/create', component: CreateQuizComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },
    {
      path: 'quiz/quizes/delete/:id', component: DeleteQuizComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },
    {
      path: 'quiz/quizes/update/:id', component: UpdateQuizComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },
    {
      path: 'quiz/quizes/details/:id', component: DetailsQuizComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },

    {
      path: 'courses', component: ListCourseComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['FREE','BASIC', 'PRO'],
          redirectTo: '/me/403'
        }
      }
    },
    {
      path: 'courses/details/:id', component: DetailsCourseComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },
    {
      path: 'courses/enrolling/:id', component: EnrollingCourseComponent,
      canActivate: [NgxPermissionsGuard],
      data: {
        permissions: {
          only: ['BASIC', 'PRO', 'ADMIN'],
          redirectTo: '/me/403'
        }
      }
    },


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
