import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable()

export class Errorinterceptor implements HttpInterceptor{
    constructor(private _authService:AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err=>{
            if([401,403].indexOf(err.status) !== -1){
                this._authService.logout();
                // location.reload(true);
            }
            const error = err.error.messege || err.statusText;
            return throwError(error)
        }))
    }
}