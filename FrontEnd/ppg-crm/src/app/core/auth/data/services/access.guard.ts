import { inject } from "@angular/core"
import { IdentityService } from "./identity-service"
import { Router } from "@angular/router";

export const canActivateAuth = () => {
    const isLoggedIn = inject(IdentityService).isAuth;

    if(isLoggedIn){
        return true
    }

    return inject(Router).createUrlTree(['/login'])
}