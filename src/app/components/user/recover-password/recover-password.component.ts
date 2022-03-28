import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/helpers/alert';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverForm: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.recoverForm = this.fb.group({
      user: ['', [ Validators.required, Validators.email ]],
    });
  }

  ngOnInit(): void {
  }

  recoverPassword(){
    if(!this.recoverForm.invalid){
      console.log(this.recoverForm.value);
      
    }else{
      showAlert('Email is empty!', 'Please enter your email', 'warning');
    }
  }

}
