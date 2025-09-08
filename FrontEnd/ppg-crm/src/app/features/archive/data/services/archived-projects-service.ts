import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProjectCardData} from '../../../projects/data/interfaces/project-card-data';

@Injectable({
  providedIn: 'root'
})
export class ArchivedProjectsService {

  http = inject(HttpClient)


  getArchivedProjects(){
    return this.http.get<ProjectCardData[]>('https://localhost:7189/api/Projects/AllArchivedProjectsOnly')
  }
}
