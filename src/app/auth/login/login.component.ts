import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private _loginService: AuthService,private _router: Router) { }

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.email])
  })
 
  get loginFormControll() {
    return this.loginForm.controls
  }

  ngOnInit(): void {
  }

  loginFormsubmit(){
    this._loginService.userLogin(this.loginForm.value)
  }

}
