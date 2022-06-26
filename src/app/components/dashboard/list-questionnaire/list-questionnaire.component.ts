import { Component, OnInit } from '@angular/core';
import { showAlert } from 'src/helpers/alert';
import { getLocalStorage } from 'src/helpers/helpers';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-list-questionnaire',
  templateUrl: './list-questionnaire.component.html',
  styleUrls: ['./list-questionnaire.component.css']
})
export class ListQuestionnaireComponent implements OnInit {

  public listQuestionnaire: IQuestionnaire[] | undefined = [];
  public _id: string | undefined = getLocalStorage('user')?._id;

  constructor(
    private _quizzService: QuizzService,
  ) { 
    this.getQuizzByIdUser(this._id);
  }

  ngOnInit(): void {
  }

  getQuizzByIdUser(_id: string| undefined){
    this._quizzService.getQuizzByIdUser(_id).subscribe({
      next: (response) =>{
        this.listQuestionnaire = response.data
        console.log('quizz', this.listQuestionnaire);
      },
      error: error =>{
        console.log('error', error);
        showAlert('Error', error.message, 'error');
      }
    });
  }

  deleteQuestionnaire(_id: string){
    console.log('id', _id);
    this._quizzService.deleteQuizz(_id).subscribe({
      next: response =>{
        showAlert('Success', response.message, 'success');
      },
      error: error =>{
        showAlert('Error', error.message, 'error');
      },
      complete: () =>{
        this.getQuizzByIdUser(this._id);
      }
    });
  }

}
