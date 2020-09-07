import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { ILogin } from '../models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login = {} as ILogin;
  loginMessage: string = "";
  isAuthenticated: string;

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group(
      {
        id: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
        password: ['', Validators.required],
      }
    )
  }

  get form(){
    return this.loginForm.controls;
  }

  ngOnInit(): void {    
  }

  onFormSubmit() {
    this.login.id = this.loginForm.controls['id'].value;
    this.login.password = this.loginForm.controls['password'].value;
    //console.log(this.login);
    this.loginService.authenticatePatient(this.login).subscribe(
      data => {        
        this.loginService.logIn(data.body);
        this.router.navigate(['dashboard/',this.login.id]);
      },
      error => {
        error.status == 0 ? this.loginMessage = "Internal Server Error" : this.loginMessage = "User Not Found";
        console.log("ERROR STATUS:",error.status);
      }
    )
  }

}
