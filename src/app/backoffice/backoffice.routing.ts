import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateQuizComponent } from 'app/backoffice/quiz/create-quiz/create-quiz.component';
import { UpdateQuizComponent } from 'app/backoffice/quiz/update-quiz/update-quiz.component';
import { DeleteQuizComponent } from 'app/backoffice/quiz/delete-quiz/delete-quiz.component';
import { DetailsQuizComponent } from 'app/backoffice/quiz/details-quiz/details-quiz.component';
import { ListQuizComponent } from 'app/backoffice/quiz/list-quiz/list-quiz.component';
import { UpdateCourseComponent } from 'app/backoffice/courses/update-course/update-course.component';
import { DetailsCourseComponent } from 'app/backoffice/courses/details-course/details-course.component';
import { CreateCourseComponent } from 'app/backoffice/courses/create-course/create-course.component';
import { ListCourseComponent } from 'app/backoffice/courses/list-course/list-course.component';
import { CreateProfessionalExperienceComponent } from 'app/backoffice/professional-experience/create-professional-experience/create-professional-experience.component';
import { UpdateProfessionalExperienceComponent } from 'app/backoffice/professional-experience/update-professional-experience/update-professional-experience.component';
import { ListProfessionalExperienceComponent } from 'app/backoffice/professional-experience/list-professional-experience/list-professional-experience.component';
import { CreateWorkSituationComponent } from 'app/backoffice/workSituation/create-work-situation/create-work-situation.component';
import { UpdateWorkSituationComponent } from 'app/backoffice/workSituation/update-work-situation/update-work-situation.component';
import { ListWorkSituationComponent } from 'app/backoffice/workSituation/list-work-situation/list-work-situation.component';
import { UpdateAcademicLevelComponent } from 'app/backoffice/academic-level/update-academic-level/update-academic-level.component';
import { ListAcademicLevelComponent } from 'app/backoffice/academic-level/list-academic-level/list-academic-level.component';
import { CreateAcademicLevelComponent } from 'app/backoffice/academic-level/create-academic-level/create-academic-level.component';
import { UpdateCategoryBudgetComponent } from 'app/backoffice/budgetCategory/update-category-budget/update-category-budget.component';
import { ListCategoryBudgetComponent } from 'app/backoffice/budgetCategory/list-category-budget/list-category-budget.component';
import { CreateEvaluationComponent } from 'app/backoffice/evaluation/create-evaluation/create-evaluation.component';
import { UpdateEvaluationComponent } from 'app/backoffice/evaluation/update-evaluation/update-evaluation.component';
import { ListEvaluationComponent } from 'app/backoffice/evaluation/list-evaluation/list-evaluation.component';
import { DetailsUserComponent } from 'app/backoffice/user/details-user/details-user.component';
import { ListUserComponent } from 'app/backoffice/user/list-user/list-user.component';
import { DeleteUserComponent } from 'app/backoffice/user/delete-user/delete-user.component';
import { UpdateUserComponent } from 'app/backoffice/user/update-user/update-user.component';
import { CreateUserComponent } from 'app/backoffice/user/create-user/create-user.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateCategoryBudgetComponent } from 'app/backoffice/budgetCategory/create-category-budget/create-category-budget.component';
import { CoachingComponent } from 'app/backoffice/coaching-backoffice/coaching/coaching.component';


const backOfficeRoutes: Routes = [


  { path: 'users', component: ListUserComponent },
  { path: 'users/create', component: CreateUserComponent },
  { path: 'users/update/:id', component: UpdateUserComponent },
  { path: 'users/delete/:id', component: DeleteUserComponent },
  { path: 'users/details/:id', component: DetailsUserComponent },

  { path: 'evaluations', component: ListEvaluationComponent },
  { path: 'evaluations/create', component: CreateEvaluationComponent },
  { path: 'evaluations/update/:id', component: UpdateEvaluationComponent },
  { path: 'evaluations/delete/:id', component: DeleteUserComponent },
  { path: 'evaluations/details/:id', component: DetailsUserComponent },

  { path: 'budget-categories', component: ListCategoryBudgetComponent },
  { path: 'budget-categories/create', component: CreateCategoryBudgetComponent },
  { path: 'budget-categories/update/:id', component: UpdateCategoryBudgetComponent },

  { path: 'academic-levels', component: ListAcademicLevelComponent },
  { path: 'academic-levels/create', component: CreateAcademicLevelComponent },
  { path: 'academic-levels/update/:id', component: UpdateAcademicLevelComponent },

  { path: 'work-situations', component: ListWorkSituationComponent },
  { path: 'work-situations/create', component: CreateWorkSituationComponent },
  { path: 'work-situations/update/:id', component: UpdateWorkSituationComponent },

  { path: 'professional-experiencies', component: ListProfessionalExperienceComponent },
  { path: 'professional-experiencies/create', component: CreateProfessionalExperienceComponent },
  { path: 'professional-experiencies/update/:id', component: UpdateProfessionalExperienceComponent },

  { path: 'quizes', component: ListQuizComponent },
  { path: 'quizes/create', component: CreateQuizComponent },
  { path: 'quizes/update/:id', component: UpdateQuizComponent },
  { path: 'quizes/delete/:id', component: DeleteQuizComponent },
  { path: 'quizes/details/:id', component: DetailsQuizComponent },

  { path: 'courses', component: ListCourseComponent },
  { path: 'courses/create', component: CreateCourseComponent },
  { path: 'courses/update/:id', component: UpdateCourseComponent },
  { path: 'courses/delete/:id', component: DeleteUserComponent },
  { path: 'courses/details/:id', component: DetailsCourseComponent },

  {
    path: 'coaching',
    canLoad: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: ['FREE', 'BASIC', 'PRO', 'ADMIN'],
        redirectTo: '/me/dashboard'
      }
    },
    children: [
      {
        path: '',
        loadChildren: 'app/backoffice/coaching-backoffice/coaching-backoffice.module#CoachingBackofficeModule'
      }],

  }
];

@NgModule({
  imports: [RouterModule.forChild(backOfficeRoutes)],
  exports: [RouterModule]
})

export class BackOfficeRoutes { }