import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { userLoginModel } from "../models/userLoginModel";
import { User } from "../models/user";


@Injectable({providedIn:'root'})

export class AuthService{
    private currentUserSubject:BehaviorSubject<User>;
    public currentUser:Observable<User>;

    constructor(private _http:HttpClient){
        let current = localStorage.getItem('Authorization')
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(current));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    url = "http://localhost:3200/api/user/login"

    userLogin(body:userLoginModel){
        return this._http.post(this.url,body).subscribe((res:any)=>{
            localStorage.setItem('Authorization',JSON.stringify(`Bearer ${res.msg}`))
        })
    }

    logout(){
        localStorage.removeItem('Authorization');
        this.currentUserSubject.next(null)
    }
}