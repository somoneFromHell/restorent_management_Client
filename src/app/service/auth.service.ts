import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { userLoginModel } from "../models/userLoginModel";
import { JwtHelperService } from '@auth0/angular-jwt'
import jwtDecode from "jwt-decode";
import { UserModel } from "../models/user";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root' })

export class AuthService {
    public token: Observable<string>;

    constructor(private _http: HttpClient, private _router: Router) {
    }
    userData() {
        const token = localStorage.getItem('Authorization')
        if(token){

            const currentUser: any = jwtDecode(token);
            return currentUser
        }else{
           this._router.navigate(['/login']);
        }
    }

    url = "http://localhost:3200/api/user/login"

    userLogin(body: userLoginModel) {
        return this._http.post(this.url, body).subscribe((res: any) => {
            localStorage.setItem('Authorization', JSON.stringify(`Bearer ${res.msg}`))
            this._router.navigate(['/main/dashboard']);

        })

    }

    logout() {


        localStorage.clear();
        this._router.navigateByUrl('/login');
        console.log('logout called')
    }
}