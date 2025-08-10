import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectMainCard } from '../interfaces/projectMainCard.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  http = inject(HttpClient)


  getProjects(){
    return this.http.get<ProjectMainCard[]>('https://localhost:7189/api/Projects/AllProjectMainData')
  }
  createProject(projName: string){
    const createProjectBody = { projectName: projName}
    return this.http.post('https://localhost:7189/api/Projects/AddProject', createProjectBody)
  }
  
}
