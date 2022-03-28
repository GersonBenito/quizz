import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/helpers/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor( private fb: FormBuilder ) {
    this.loginForm = this.fb.group({
      user: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(8) ]],
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    
    if(!this.loginForm.invalid){
      console.log(this.loginForm.value);
      
    }else{
      showAlert('Login invalid!', 'Please enter all fields', 'warning');
    }
    
  }

}
