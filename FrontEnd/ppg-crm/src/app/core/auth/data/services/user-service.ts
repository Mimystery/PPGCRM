import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { IdentityService } from './identity-service';
import {ProcessDetails} from '../../../../features/project-details/stages-list/data/interfaces/process.interface';
import {ProjectDetails} from '../../../../features/project-details/data/interfaces/project.details.interface';

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
    return this.http.get<User[]>(`https://localhost:7189/api/Users/GetAllUsers`)
  }
  updateUser(userId: string, userUpdateBody: User) {
    return this.http.put(`https://localhost:7189/api/Users/UpdateUser/${userId}`, userUpdateBody);
  }
  getAllProjectsByUserId(userId:string){
    return this.http.get<ProjectDetails[]>(`https://localhost:7189/api/Users/GetProjectsByUserId?userId=${userId}`);
  }

  getAllProcessesByUserIdAndProcessId(userId:string, projectId:string){
    return this.http.get<ProcessDetails[]>(`https://localhost:7189/api/Users/GetUserProcesses?userId=${userId}&projectId=${projectId}`);
  }
  getAllProcessesByUserIdAndProcessIdAndStageId(userId:string, projectId:string, stageId:string){
    return this.http.get<ProcessDetails[]>(`https://localhost:7189/api/Users/GetUserProcesses?userId=${userId}&projectId=${projectId}&stageId=${stageId}`);
  }
}
