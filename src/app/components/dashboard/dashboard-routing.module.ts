import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedQuestionComponent } from './created-question/created-question.component';
import { CreatedQuizzComponent } from './created-quizz/created-quizz.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';

const routes: Routes = [
  { path: '', component: ListQuestionnaireComponent },
  { path: 'create-quizz', component: CreatedQuestionComponent },
  { path: 'create-question', component: CreatedQuizzComponent }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
