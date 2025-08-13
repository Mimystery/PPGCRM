import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { IdentityService } from './identity-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  identityService = inject(IdentityService)

  getUserDetails(){
    const userId = this.identityService.getUserId();
    return this.http.get<User>(`https://localhost:7189/api/Users/GetUserDetails/${userId}`)
  }
  getAllUsers(){

  }
}
