import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResponseComponent } from '../shared/user-response/user-response.component';
import { CreatedQuestionComponent } from './created-question/created-question.component';
import { CreatedQuizzComponent } from './created-quizz/created-quizz.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ViewQuestionnaireComponent } from './view-questionnaire/view-questionnaire.component';

const routes: Routes = [
  { path: '', component: ListQuestionnaireComponent },
  { path: 'create-quizz', component: CreatedQuestionComponent },
  { path: 'create-question', component: CreatedQuizzComponent },
  { path: 'view-questionnaire/:id', component: ViewQuestionnaireComponent },
  { path: 'statistics/:id', component: StatisticsComponent },
  { path: 'admin-response/:id', component: UserResponseComponent },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
