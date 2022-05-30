import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/helpers/alert';
import { IQuestions } from 'src/interfaces/questions.interface';
import { IResponse } from 'src/interfaces/responses.interface';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-created-quizz',
  templateUrl: './created-quizz.component.html',
  styleUrls: ['./created-quizz.component.css']
})
export class CreatedQuizzComponent implements OnInit {

  public formQuestion: FormGroup;
  public arrayResponse: string[] = ['response1', 'response2', 'response3', 'response4'];

  constructor(
    private _quizzService: QuizzService,
    private fb: FormBuilder
  ) {

    this.formQuestion = this.fb.group({
      title: ['', Validators.required],
      seconds: [10, Validators.required],
      score: [1000, Validators.required],
      response1: this.fb.group({
        title: ['', Validators.required],
        isTrue: [false, Validators.required]
      }),
      response2: this.fb.group({
        title: ['', Validators.required],
        isTrue: [false, Validators.required]
      }),
      response3: this.fb.group({
        title: ['', Validators.required],
        isTrue: [false, Validators.required]
      }),
      response4: this.fb.group({
        title: ['', Validators.required],
        isTrue: [false, Validators.required]
      }),
    });

  }

  ngOnInit(): void {}

  // para retornar el valor de los segundos en el formulario, debido a que no es in input
  get seg(){ return this.formQuestion.get('seconds')?.value };
  get scor(){ return this.formQuestion.get('score')?.value };

  addQuestion(){
    if(this.formQuestion.invalid){
      showAlert('Fields empty', 'All fields are required', 'warning');
      return;
    }

    if(this.allResponsesFalse()){
      showAlert('Warning','Response true no select', 'warning');
      return;
    }
    
    const question: IQuestions = {
      title: this.formQuestion.get('title')?.value || '',
      score: this.formQuestion.get('score')?.value || '',
      seconds: this.formQuestion.get('seconds')?.value || '',
      listResponse: this.getResponses(),
    }
    
    this._quizzService.setQuestion(question);
    this.resetForm();
  }

  // method for plus or less
  plusLess(number: number){

    // validate seconds
    if(this.seg <= 5){
      console.log('second', this.seg);
      
      showAlert('Warning!!', 'you can not add less of 5 secods', 'warning');
      return;
    }
    this.formQuestion.patchValue({
      seconds: this.seg + number,
    });
  }

  isCorrect(number: number){
    let response = `response${number}`;
    this.setFalseResponse(response);
    let statusResponse = this.statusResponse(response);

    this.formQuestion.get(response)?.patchValue({
      isTrue: !statusResponse,
    });
  }

  statusResponse(response: string): boolean{
    return this.formQuestion.get(response)?.get('isTrue')?.value;
  }

  setFalseResponse(response: string){
    for(let i = 0; i< this.arrayResponse.length; i++){
      if(this.arrayResponse[i] !== response){
        this.formQuestion.get(this.arrayResponse[i])?.patchValue({
          isTrue: false,
        });
      }
    }
  }

  // verify if all questions are false
  allResponsesFalse(): boolean{
    for(let i = 0; i< this.arrayResponse.length; i++){
      if(this.formQuestion.get(this.arrayResponse[i])?.get('isTrue')?.value){
        return false;
      }
    }
    return true;
  }

  getResponses(): IResponse[]{
    let listResponses: IResponse[] = [];

    for(let i = 0; i< this.arrayResponse.length; i++){
      const titleResponse = this.formQuestion.get(this.arrayResponse[i])?.get('title')?.value;
      const isTrueResponse = this.formQuestion.get(this.arrayResponse[i])?.get('isTrue')?.value;
      const response: IResponse = {
        title: titleResponse,
        isTrue: isTrueResponse,
      }

      listResponses.push(response)
      
    }

    return listResponses
  }

  resetForm(){
    this.formQuestion.patchValue({
      title: '',
      seconds: 10,
      score: 1000,
      response1: {
        title: '',
        isTrue: false
      },
      response2: {
        title: '',
        isTrue: false
      },
      response3: {
        title: '',
        isTrue: false
      },
      response4: {
        title: '',
        isTrue: false
      },
    });
  }

}
