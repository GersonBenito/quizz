import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizzService } from 'src/services/quizz.service';

@Component({
  selector: 'app-created-question',
  templateUrl: './created-question.component.html',
  styleUrls: ['./created-question.component.css']
})
export class CreatedQuestionComponent implements OnInit {

  public questionForm: FormGroup;
  public showAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _quizzService: QuizzService,
  ) { 
    this.questionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  next(){
    if(this.questionForm.invalid){
      this.showAlert = true;
      setTimeout(() => this.showAlert = false, 2000);
    }else{
      this._quizzService.titleQuestionnaire = this.questionForm.get('title')?.value;
      this._quizzService.descriptionQuestionnaire = this.questionForm.get('description')?.value;
      this.router.navigate(['dashboard/create-question']);
    }
    
  }

}
