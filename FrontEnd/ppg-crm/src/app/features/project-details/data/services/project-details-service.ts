import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectDetails } from '../interfaces/project.details.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  http = inject(HttpClient)

  getAllProjectDetails(projectId: string){
    return this.http.get<ProjectDetails>(`https://localhost:7189/api/Projects/allProjectDetails/${projectId}`)
  }
  updateProjectDetails(projectId: string, projectDetails: ProjectDetails) {
    return this.http.put<ProjectDetails>(`https://localhost:7189/api/Projects/updateProject/${projectId}`, projectDetails);
  }

}
