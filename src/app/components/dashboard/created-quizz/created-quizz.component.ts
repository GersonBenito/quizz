import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/helpers/alert';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-created-quizz',
  templateUrl: './created-quizz.component.html',
  styleUrls: ['./created-quizz.component.css']
})
export class CreatedQuizzComponent implements OnInit {

  public formQuestion: FormGroup;

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

  ngOnInit(): void {
    console.log('title', this._quizzService.titleQuestionnaire, 'description', this._quizzService.descriptionQuestionnaire);
    
  }

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
    console.log('form', this.formQuestion);
    
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
    const arrayResponse: string[] = ['response1', 'response2', 'response3', 'response4'];
    for(let i = 0; i< arrayResponse.length; i++){
      if(arrayResponse[i] !== response){
        this.formQuestion.get(arrayResponse[i])?.patchValue({
          isTrue: false,
        });
      }
    }
  }

  // verify if all questions are false
  allResponsesFalse(): boolean{
    const arrayResponse: string[] = ['response1', 'response2', 'response3', 'response4'];
    for(let i = 0; i< arrayResponse.length; i++){
      if(this.formQuestion.get(arrayResponse[i])?.get('isTrue')?.value){
        return false;
      }
    }
    return true;
  }

}
