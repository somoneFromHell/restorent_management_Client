import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";

@Injectable()

export class jwtInterceptor implements HttpInterceptor{
    constructor(private _authServie:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('Authorization')
        if(token){
            req = req.clone({
                setHeaders:{
                    Authorization : token
                }
            })
        }
        return next.handle(req);

    }
}