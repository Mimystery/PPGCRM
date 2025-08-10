import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectCardData } from '../interfaces/project-card-data';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  http = inject(HttpClient)


  getProjects(){
    return this.http.get<ProjectCardData[]>('https://localhost:7189/api/Projects/AllProjectsMainData')
  }
  createProject(projName: string){
    const createProjectBody = { projectName: projName}
    return this.http.post('https://localhost:7189/api/Projects/AddProject', createProjectBody)
  }

}
