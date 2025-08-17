import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProjectDetails } from '../interfaces/project.details.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {
  http = inject(HttpClient)

  getAllProjectDetails(projectId: string){
    this.http.get<ProjectDetails>(`https://localhost:7189/api/Projects/AllProjectDetails/${projectId}`)
  }
}
