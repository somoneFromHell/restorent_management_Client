import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { userLoginModel } from "../models/userLoginModel";


@Injectable({
    providedIn:'root'
})

export class AuthService{
    constructor(private _http:HttpClient){}

    url = "http://localhost:3200/api/user/login"

    userLogin(body:userLoginModel){
        return this._http.post(this.url,body).subscribe(res=>console.log(res))

    }
}