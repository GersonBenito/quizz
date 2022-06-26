import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-view-questionnaire',
  templateUrl: './view-questionnaire.component.html',
  styleUrls: ['./view-questionnaire.component.css']
})
export class ViewQuestionnaireComponent implements OnInit {

  public _id: string = '';
  public loading: boolean = false;
  public quizz: IQuestionnaire  | any = {
    _id: '',
    user: '',
    title: '',
    code: '',
    numberQuestion: 0,
    creationDate: new Date(),
    description: '',
    listQuestion: []
  };

  constructor(
    private _quizzServices: QuizzService,
    private aRouter: ActivatedRoute,
  ) { 
    this._id = this.aRouter.snapshot.paramMap.get('id') || '';
    this.getQUizzById(this._id);
  }

  ngOnInit(): void {
  }

  getQUizzById(_id: string){
    this.loading = true;
    this._quizzServices.getQuizzById(_id).subscribe({
      next: response =>{
        this.quizz = response.data;
        console.log('response ', this.quizz);
        this.loading = false;
      },
      error: error =>{
        console.log('error', error);
        showAlert('Error', error.message, 'error');
        this.loading = false;
      }
    });
  }

}
