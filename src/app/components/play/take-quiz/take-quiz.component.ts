import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IQuestionnaire } from 'src/interfaces/questionnaire.interface';
import { IQuestions } from 'src/interfaces/questions.interface';
import { IResponse } from 'src/interfaces/responses.interface'
import { ResponseQuizService } from 'src/services/response-quiz.service';

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit, OnDestroy {

  public participantName: string = '';
  public indexQuestion: number = 0;
  public counterSeconds: number = 0;
  public interval: any;
  public optionSelected!: IResponse;
  public indexSelected: number = 0;
  public quiz: IQuestionnaire = {
    _id: '',
    user: '',
    title: '',
    code: '',
    creationDate: new Date(),
    numberQuestion: 0,
    description: '',
    listQuestion: [],
  };

  constructor(
    private _responseQuizzService: ResponseQuizService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData();
    this._responseQuizzService.isEmptyQuiz();
    this.startCounterSeconds();
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getData(){
    this._responseQuizzService.$quiz.subscribe({
      next: result =>{
        this.quiz = result;
        console.log(this.quiz);
      }
    })

    this.participantName = this._responseQuizzService.participantName;
  }

  getDataQuiz(): IQuestions {
    let question: IQuestions = {
      seconds: this.quiz.listQuestion[this.indexQuestion].seconds,
      title: this.quiz.listQuestion[this.indexQuestion].title,
      score: this.quiz.listQuestion[this.indexQuestion].score,
      listResponse: this.quiz.listQuestion[this.indexQuestion].listResponse,
    }
    return question;
  }

  startCounterSeconds(){
    this.counterSeconds = this.quiz.listQuestion[this.indexQuestion].seconds || 0;
    this.interval = setInterval(()=>{
      this.counterSeconds--;
      this.cleanInterval();
    }, 1000);
  }

  cleanInterval(): any{
    if(this.counterSeconds === 0){
      this.indexQuestion++;
      clearInterval(this.interval);
      this.startCounterSeconds();
    }
  }

  selectedResponse(response: IResponse, index: number){
    this.optionSelected = response;
    this.indexSelected = index;
  }

  addClassOption(response: IResponse): string{
    if(response === this.optionSelected){
      return 'selected';
    }else{
      return '';
    }
  }

  nextQuestion(){
    clearInterval(this.interval);
    this.addResponse();
    this.startCounterSeconds();
  }

  addResponse(){
    // validate last question
    if(this.quiz.listQuestion.length -1 === this.indexQuestion){
      // save responses in the backend
      // redirect to next componment
      this.router.navigate(['/play/user-response']);
    }else{
      this.indexQuestion++;
      this.counterSeconds = this.quiz.listQuestion[this.indexQuestion].seconds;
    }
  }

}
