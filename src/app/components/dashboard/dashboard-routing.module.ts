import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatedQuizzComponent } from './dashboard/created-quizz/created-quizz.component';
import { ListQuestionnaireComponent } from './list-questionnaire/list-questionnaire.component';

const routes: Routes = [
  { path: '', component: ListQuestionnaireComponent },
  { path: 'created-quizz', component: CreatedQuizzComponent }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
