import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
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
  public optionSelected!: IResponse | undefined;
  public indexSelected: number | undefined = 0;
  public correctsAmount: number = 0;
  public incorrectsAmount: number = 0;
  public scoreTotal: number = 0;
  public listUserResponse: any[] = [];
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
      clearInterval(this.interval);
      this.addResponse();
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
    this.conunterCorrectAndIncorrect();
    const userResponse = {
      title: this.quiz.listQuestion[this.indexQuestion].title,
      pointsEarned: this.getPointsQuestion(),
      seconds: this.getSeconds(),
      indexSelectResponse: this.getIndexSelected(),
      listResponses: this.quiz.listQuestion[this.indexQuestion].listResponse,
    }

    this.listUserResponse.push(userResponse);
    this.optionSelected = undefined;
    this.indexSelected = undefined;

    // validate last question
    if(this.quiz.listQuestion.length -1 === this.indexQuestion){
      // save responses in the backend
      this.saveReponsesQuiz();
    }else{
      this.indexQuestion++;
      this.counterSeconds = this.quiz.listQuestion[this.indexQuestion].seconds;
    }
  }

  getPointsQuestion(): number{
    const pointsQuestion = this.quiz.listQuestion[this.indexQuestion].score;

    if(this.optionSelected === undefined){
      return 0;
    }

    if(this.optionSelected.isTrue === true){
      this.scoreTotal = this.scoreTotal + pointsQuestion;
      return pointsQuestion;
    }else{
      return 0;
    }

  }

  getSeconds(): number | string {
    if(this.optionSelected === undefined){
      return 'NO ANSWERED';
    }else{
      const secondsQuestion = this.quiz.listQuestion[this.indexQuestion].seconds;
      const secondsResponse = secondsQuestion - this.counterSeconds;
      return secondsResponse;
    }
  }

  getIndexSelected(): number | string | undefined{
    if(this.optionSelected === undefined){
      return '';
    }else{
      return this.indexSelected;
    }
  }

  conunterCorrectAndIncorrect(){
    // validate if the user selected question
    if(this.optionSelected === undefined){
      this.incorrectsAmount++;
      return;
    }

    // validate if the option is INCORRECT
    if(this.optionSelected.isTrue === false){
      this.incorrectsAmount++;
    }else{
      this.correctsAmount++;
    }
  }

  saveReponsesQuiz(){
    const responsesQuiz = {
      idQuiz: this.quiz._id,
      participantName: this.participantName,
      date: new Date(),
      amountQuestions: this.quiz.numberQuestion,
      amountCorrect: this.correctsAmount,
      amountIncorrect: this.incorrectsAmount,
      scoreTotal: this.scoreTotal,
      listUserResponse: this.listUserResponse,
    }
    this._responseQuizzService.saveUserResponse(responsesQuiz).subscribe({
      next: response =>{
        console.log(response);
        // showAlert('Success', response.message, 'success');
        // redirect to next componment
        this.router.navigate(['/play/user-response', response.data]);
      },
      error: error =>{
        showAlert('Error', error.error.message, 'error');
        this.router.navigate(['/']);
      }
    });
    
  }

}
