import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenResponse } from '../interfaces/token.interface';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../interfaces/user.interface';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  http = inject(HttpClient)
  cookieService = inject(CookieService)
  router = inject(Router)

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth() {
    if(!this.token && !this.refreshToken){
      this.token = this.cookieService.get('token')
      this.refreshToken = this.cookieService.get('refreshToken')
    }
    return !!this.token
  }

  getUserId(): string | null {
    if(!this.token){
      this.token = this.cookieService.get('token')
    }
    if (!this.token){
      return null;
    }

    try{
      const decoded = jwtDecode<JwtPayload>(this.token);
      return decoded.Id;
    }
    catch (e) {
      //console.error("Error", e);
      return null
    }
  }

  checkPendingUser(code: string): Observable<any> {
    return this.http.get(`https://localhost:7189/api/Identity/CheckPendingUser/${code}`);
  }
  registerByUser(code: string, email: string, password: string){
    const user = {email: email, password: password}
    return this.http.post(`https://localhost:7189/api/Identity/RegisterByUser/${code}`, user);
  }

  registerByAdmin(payload: {firstName: string, lastName: string, role: string, salary: number}){
    const user = {payload}
    return this.http.post<string>(`https://localhost:7189/api/Identity/RegisterByAdmin`, user)
  }

  login(payload: {email: string, password: string}){
    return this.http.post<TokenResponse>(`https://localhost:7189/api/Identity/Login`, payload)
    .pipe(
      tap(val => {
        this.saveTokens(val)
      })
    )
  }

  refreshTokenMethod(){
    if (!this.refreshToken) {
    this.refreshToken = this.cookieService.get('refreshToken');
  }
    return this.http.post<TokenResponse>(`https://localhost:7189/api/Identity/RefreshToken`, 
      { refreshToken: this.refreshToken }).pipe(
        tap(res => {
          this.saveTokens(res)
        }),
        catchError(err => {
          this.logout()
          return throwError(err)
        })
      )
  }

  logout() {
    this.cookieService.deleteAll
    this.token = null
    this.refreshToken = null
    this.router.navigate(['login'])
  }

  saveTokens(res: TokenResponse){
    this.token = res.accessToken,
    this.refreshToken = res.refreshToken

    this.cookieService.set('token', this.token)
    this.cookieService.set('refreshToken', this.refreshToken)
  }
}
