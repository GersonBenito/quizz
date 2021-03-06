import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public spinner: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private authService: AuthService, 
    private router: Router,
  ) { 
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
    }, { validator: this.checkPassword });
  }

  ngOnInit(): void {
  }

  registerUser(): void{
    if(!this.registerForm.invalid){
      const { userName,email, password } = this.registerForm.value;
      const newUser = {userName, email, password };

      this.spinner = true;
      this.authService.createUser(newUser).subscribe({
        next: (response) =>{
          showAlert('Success!', response.message, 'success');
        },
        error: (error) =>{
          this.spinner = false;
          showAlert('Register invalid!', error.error.message, 'error');
        },
        complete: () =>{
          this.spinner = false;
          this.router.navigate(['/user']);
        }
      });
      
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
