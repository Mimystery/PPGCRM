import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { IdentityService } from "./identity-service";

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(IdentityService).token

    if(!token){
        return next(req)
    }

    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })

    return next(req)
}