import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { userLoginModel } from "../models/userLoginModel";
import { JwtHelperService } from '@auth0/angular-jwt'
import jwtDecode from "jwt-decode";
import { UserModel } from "../models/user";


@Injectable({providedIn:'root'})

export class AuthService{
    public token:Observable<string>;

    constructor(private _http:HttpClient){
    }
    userData(){
        const token = localStorage.getItem('Authorization')
        const currentUser:UserModel = jwtDecode(token);
        return(currentUser)
    }

    url = "http://localhost:3200/api/user/login"

    userLogin(body:userLoginModel){
        return this._http.post(this.url,body).subscribe((res:any)=>{
            localStorage.setItem('Authorization',JSON.stringify(`Bearer ${res.msg}`))
        })
    }

    logout(){
        localStorage.removeItem('Authorization');
    }
}