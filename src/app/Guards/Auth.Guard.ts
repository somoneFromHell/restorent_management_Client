import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable({providedIn:'root'})

export class AuthGuard {
    constructor(private _router:Router,private _authService:AuthService) {}

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //     const currentUser = this._authService.currentUserValue;
    //     if(currentUser){
    //         if(route.data)
    //     }
    }

