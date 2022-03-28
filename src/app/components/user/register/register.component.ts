import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { showAlert } from 'src/helpers/alert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup

  constructor( private fb: FormBuilder ) { 
    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
  }

  registerUser(): void{
    if(!this.registerForm.invalid){
      console.log(this.registerForm.value);
      
    }else{
      showAlert('Register invalid!', 'Please enter all fields', 'warning');
    }
  }

  checkPassword(group: FormGroup): object | null {
    const password = group.controls['password'].value;
    const confirmPassword = group.controls['confirmPassword'].value;

    return password === confirmPassword ? null : { notSame: true }
  }

}
