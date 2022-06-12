import { Component, OnInit } from '@angular/core';
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

  constructor(
    private _quizzService: QuizzService,
  ) { 
    const _id = getLocalStorage('user')?._id;
    this.getQuizzByIdUser(_id);
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
        
      }
    });
  }

}
