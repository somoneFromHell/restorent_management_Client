import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { pageModel, UserModel } from "../models/user";
import { AuthService } from "../service/auth.service";

@Injectable({ providedIn: 'root' })

export class AuthGuard {
    constructor(private _router: Router, private _authService: AuthService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let conditionSatisfied = false
        const User:UserModel = this._authService.userData();
        let listOfPages:string[] = []
        User.pages.forEach(element => {
            listOfPages.push(element.pageName)  
        });
        if (listOfPages.includes(route.data['pageName'])) {
            conditionSatisfied = true
        }else{
            this._authService.logout()
        }
        return conditionSatisfied
    }
}  