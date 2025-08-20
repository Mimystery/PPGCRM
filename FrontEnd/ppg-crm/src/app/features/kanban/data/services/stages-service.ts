import {inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectedProjectService } from '../../../../core/services/selected-project/selected-project';
import { Stage } from '../interfaces/stage.interface';

@Injectable({
  providedIn: 'root'
})
export class StagesService {
  http = inject(HttpClient);
  selectedProjectService = inject(SelectedProjectService)

  getStages() {
    return this.http.get<Stage[]>(`https://localhost:7189/api/Stages/GetAllStagesByProjectId/${this.selectedProjectService.selectedProjectId()}`);
  }

  createStage(stName: string) {
    const createStageBody = { stageName: stName}
    return this.http.post(`https://localhost:7189/api/Stages/AddStageByProjectId/${this.selectedProjectService.selectedProjectId()}`, createStageBody)
  }

  updateStage(stageId: string, stageName: string){
    const updateStageBody = { stageName: stageName}
    return this.http.put(`https://localhost:7189/api/Stages/UpdateStageByProjectId/${this.selectedProjectService.selectedProjectId()}?stageId=${stageId}`, updateStageBody)
  }

}
