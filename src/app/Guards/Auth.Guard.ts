import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { RoutsRightsModel, UserModel } from "../models/user";
import { AuthService } from "../service/auth.service";

@Injectable({ providedIn: 'root' })

export class AuthGuard {
    constructor(private _router: Router, private _authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const User: UserModel = this._authService.userData();
        let dependencySatisfied = true

        if (User) {
            let pageDependency = route.data["backEndDependency"]
            pageDependency.forEach((element: any) => {
                let satisfiedDependency:RoutsRightsModel[] = User.role.routs.filter(n => n.name === element)
                console.log(satisfiedDependency)
                if (satisfiedDependency.length === 0) {
                    dependencySatisfied = false
                console.log(`not allowd to access this route` ,state.url)

                }

            });
            
        }
        return dependencySatisfied
    }
}