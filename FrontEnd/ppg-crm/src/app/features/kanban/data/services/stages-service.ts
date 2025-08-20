import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectedProjectService } from '../../../../core/services/selected-project/selected-project';
import { Stage } from '../interfaces/stage.interface';
import { StageCard } from '../interfaces/stage-card.interface';

@Injectable({
  providedIn: 'root'
})
export class StagesService {
  http = inject(HttpClient);
  selectedProjectService = inject(SelectedProjectService)

  getAllStages(projectId:string) {
    return this.http.get<StageCard[]>(`https://localhost:7189/api/Stages/GetAllStagesByProjectId/${projectId}`);
  }

}
