import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StageCard } from '../interfaces/stage-card.interface';

@Injectable({
  providedIn: 'root'
})
export class StagesService {
  http = inject(HttpClient);

  getAllStages(projectId:string) {
    return this.http.get<StageCard[]>(`https://localhost:7189/api/Stages/GetAllStagesByProjectId/${projectId}`);
  }
}
