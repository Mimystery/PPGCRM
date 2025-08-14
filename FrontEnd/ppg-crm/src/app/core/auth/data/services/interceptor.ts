import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { IdentityService } from "./identity-service";
import { catchError, switchMap, throwError } from "rxjs";

let isRefreshing = false

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const identityService = inject(IdentityService)
    const token = identityService.token

    if(!token){
        return next(req)
    }

    if(isRefreshing){
        return refreshAndProceed(identityService, req, next)
    }

    return next(addToken(req,token)).pipe(
        catchError(error => {
            if(error.status === 401){
                return refreshAndProceed(identityService, req, next)
            }
            return throwError(error)
        })
    )
}

const refreshAndProceed = (identityService: IdentityService, 
    req: HttpRequest<any>, next: HttpHandlerFn) => {
        if(!isRefreshing){
            isRefreshing = true
            return identityService.refreshTokenMethod()
        .pipe(
            switchMap( res => {
                isRefreshing = false
                return next(addToken(req, res.accessToken))
            })
        )}

        return next(addToken(req, identityService.token!))
}

const addToken = (req: HttpRequest<any>, token: string) => {
        return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}