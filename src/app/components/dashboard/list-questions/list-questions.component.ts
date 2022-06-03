import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { generateCode, getLocalStorage } from 'src/helpers/helpers';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { IQuestions } from 'src/interfaces/questions.interface';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  public listQuestions: IQuestions[] = [];

  constructor(
    private _quizzService: QuizzService,
    private router: Router,
  ) { 
    this._quizzService.getQuestion().subscribe({
      next: result =>{
        this.listQuestions = [...this.listQuestions, result ];
        console.log('list question', this.listQuestions);
      }
    });
  }

  ngOnInit(): void {
    if(this._quizzService.titleQuestionnaire === '' || this._quizzService.descriptionQuestionnaire === ''){
      this.router.navigate(['/dashboard/create-quizz']);
    }
  }

  deleteQuestion(index: number){
    this.listQuestions.splice(index, 1); // uso de splice para eliminar un elemento dentro de un arreglo por medio del index
  }

  finishQuestionnaire(){
    const questionnaire: IQuestionnaire = {
      _id: getLocalStorage('user')?._id,
      title: this._quizzService.titleQuestionnaire,
      description: this._quizzService.descriptionQuestionnaire,
      code: generateCode(),
      numberQuestion: this.listQuestions.length,
      creationDate: new Date(),
      listQuestion: this.listQuestions
    }

    this._quizzService.createQuizz(questionnaire).subscribe({
      next: response =>{
        showAlert('Success!', response.message, 'success');
        this.router.navigate(['/dashboard']);
      },
      error: errror =>{
        showAlert('Success!', errror.error.message, 'error');
      }
    });
  }

}
