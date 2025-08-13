import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  http = inject(HttpClient)
  //cookieService = inject(CookieService)

  checkPendingUser(code: string): Observable<any> {
    return this.http.get(`https://localhost:7189/api/Identity/CheckPendingUser/${code}`);
  }
  registerByUser(code: string, email: string, password: string){
    const user = {email: email, password: password}
    return this.http.post(`https://localhost:7189/api/Identity/RegisterByUser/${code}`, user);
  }

  login(payload: {email: string, password: string}){
    return this.http.post(`https://localhost:7189/api/Identity/Login`, payload)
  }
}
