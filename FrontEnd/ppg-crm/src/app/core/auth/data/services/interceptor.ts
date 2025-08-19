import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { IdentityService } from "./identity-service";
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from "rxjs";

let isRefreshing = false
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const identityService = inject(IdentityService)
    const token = identityService.token

    if(!token){
        return next(req)
    }

    // if(isRefreshing){
    //     return refreshAndProceed(identityService, req, next)
    // }

    return next(addToken(req,token)).pipe(
        catchError(error => {
            if(error.status === 401 || error.status === 400){
                return handle401Error(req, next, identityService)
            }
            return throwError(error)
        })
    )
}

const handle401Error = (req: HttpRequest<any>, next: HttpHandlerFn, identityService: IdentityService) => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return identityService.refreshTokenMethod().pipe(
      switchMap(res => {
        isRefreshing = false;
        const newToken = res.accessToken;
        identityService.token = newToken;

        refreshTokenSubject.next(newToken);

        return next(addToken(req, newToken));
      }),
      catchError(err => {
        isRefreshing = false;
        // тут можно вызвать identityService.logout() если refresh тоже невалидный
        return throwError(() => err);
      })
    );
  } else {
    // если refresh уже идёт → ждём, когда обновится токен
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next(addToken(req, token!)))
    );
  }
};

const addToken = (req: HttpRequest<any>, token: string) => {
        return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}