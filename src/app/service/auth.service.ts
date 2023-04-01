import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { userLoginModel } from "../models/userLoginModel";
import { JwtHelperService } from '@auth0/angular-jwt'
import jwtDecode from "jwt-decode";
import { UserModel } from "../models/user";
import { Router } from "@angular/router";
import { environment } from "src/environment/environment";
import { ToastrService } from "ngx-toastr";


@Injectable({ providedIn: 'root' })

export class AuthService {
    public token: Observable<string>;
    constructor(private _http: HttpClient, private _router: Router,private _tosterService:ToastrService) { }
    
    url = `${environment.apiURL}/user/login`
    profileUrl = `${environment.apiURL}/user`
    
    getAllUsers(){
        return this._http.get(`${environment.apiURL}/user`)
    }
    getAllRoles() {
        return this._http.get(`${environment.apiURL}/roles`)
    }

    getUserById(id:string) {
        return this._http.get(`${environment.apiURL}/user/${id}`)
    }

    userData() {
        const token = localStorage.getItem('Authorization')
        try {
            const currentUser: any = jwtDecode(token);
            return currentUser
        } catch (error) {
            this._router.navigate(['/login']);
            console.log(error)
        }
    }

    EditprofileData(body:UserModel,id:string) {
        return this._http.put(`${this.profileUrl}/${id}`, body)
    }
    getProfiledata(body:UserModel){
        return this._http.get(`${this.profileUrl}/${body._id}`)
    }

    registerUser(email:string,password:string){
        return this._http.post(this.url,{email:email,password:password})
    }

    userLogin(body: userLoginModel) {
        return this._http.post(this.url, body)}

    logout() {
        localStorage.clear();
        this._router.navigateByUrl('/login');
        console.log('logout called')
    }
}