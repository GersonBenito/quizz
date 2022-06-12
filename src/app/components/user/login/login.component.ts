import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { showAlert } from 'src/helpers/alert';
import { setLocalStorage } from 'src/helpers/helpers';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public spinner: boolean = false;

  constructor( 
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(16) ]],
    });
  }

  ngOnInit(): void {
  }

  login(): void{
    
    if(!this.loginForm.invalid){
      const { email, password } = this.loginForm.value;
      const user = { email, password };
      this.spinner = true;
      this.loginService.login(user).subscribe({
        next: (response) =>{
          console.log('rersponse', response);
          
          // const result = this.saveLocalStorage(response.data);
          const result = setLocalStorage('user', response.data)
          if(result){
            // TODO: falta verificar correo
            showAlert(`Welcome ${response.data?.userName}!`, response.message, 'success');
            this.router.navigate(['/dashboard']);
          }
        }, 
        error: (error) =>{
          showAlert('Login invalid!', error.error.message, 'error');
          this.spinner = false;
        },
        complete: () =>{
          this.spinner = false;
        }
      });
      
    }else{
      showAlert('Login invalid!', 'Please enter all fields', 'warning');
    }
    
  }

}
