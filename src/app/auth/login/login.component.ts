import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _loginService: AuthService, private _router: Router, private _toster: ToastrService) { }

  submitted = false
  showLoading = false
  errorMsg: any;
  loginError: any;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  get loginFormControll() {
    return this.loginForm.controls
  }

  ngOnInit(): void {
  }

  loginFormsubmit() {

    this.submitted = true
    if (!this.loginForm.invalid) {
      this.showLoading = true
      this._loginService.userLogin(this.loginForm.value).subscribe((res: any) => {
        if (!res.success) { console.log(res.msg) }
        localStorage.setItem('Authorization', JSON.stringify(`Bearer ${res.msg}`))

        this._router.navigate(['/main/dashboard']);

      }, (error) => {
        console.log(error,error.statusText)
        this.showLoading = false
        this.submitted = false
        if (error.statusText === 'Bad Request'){
          this._toster.error('in correct email or password', 'Error')
          this.loginForm.reset()
        }else{
          this._toster.error('server not responding', 'Error')
        }
      })
    }

  }

}
