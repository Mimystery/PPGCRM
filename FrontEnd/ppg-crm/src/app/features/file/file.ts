import { Component, inject, input, signal } from '@angular/core';
import { NzCollapseComponent, NzCollapseModule } from "ng-zorro-antd/collapse";
import { DatePipe } from '@angular/common';
import { NzProgressComponent } from "ng-zorro-antd/progress";
import { NzTagComponent } from "ng-zorro-antd/tag";
import { ProcessDrawerComponent } from "../project-details/stages-list/process-drawer/process-drawer";
import { NzButtonModule } from "ng-zorro-antd/button";
import { ProcessDetails } from '../kanban/data/interfaces/process.interface';
import { Stage } from '../kanban/data/interfaces/stage.interface';
import { CalculateProgressService } from '../project-details/data/services/calculate-progress-service';
import { StagesService } from '../kanban/data/services/stages-service';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-file',
  imports: [NzCollapseComponent, DatePipe, NzProgressComponent, NzTagComponent, 
    ProcessDrawerComponent, NzButtonModule, NzCollapseModule, FormsModule, NzInputModule, NzIconModule ],
  templateUrl: './file.html',
  styleUrl: './file.less'
})
export class FileComponent {
  calculateProgressService = inject(CalculateProgressService)
  stageService = inject(StagesService)

  public processDrawerVisible =  signal(false);
  public stages: Stage[] | null = null;
  public selectedProcess = signal<ProcessDetails | null>(null);
  searchQuery = '';

  public selectedStageId = signal<string>('All');

  constructor(){
    this.stageService.getStages().subscribe( val => {
      this.stages = val
      console.log(this.stages)
    })
  }

  get filteredStages(): Stage[] {
    if (!this.stages) return [];
    if (this.selectedStageId() === 'All'){
      return this.stages!;
    }
    return this.stages!.filter(s => s.stageId === this.selectedStageId());
  }

  showOpenFiletModal(){

  }

  onFileDrop(event: any){

  }

  onProcessDeleted(processId: string) {
  for (let stage of this.stages!) {
    stage.processes = stage.processes.filter(p => p.processId !== processId);
  }
}

  getStageEndDate(stage: Stage): Date | null{
    if(!stage || !stage.processes || stage.processes.length === 0) {
      return null
    }

    let maxDate: Date | null = null;

    for(const process of stage.processes){
      const endDate = process.factEndDate ? new Date(process.factEndDate) : (process.planEndDate ? new Date(process.planEndDate) : null);
      if(endDate){
        if(!maxDate || endDate > maxDate){
          maxDate = endDate;
        }
      }
    }

    return maxDate;
  }

  getStageSuccessProgress(stage: Stage): number {
    if(!stage || !stage.processes){
      return 0
    }

    const total = stage.processes.length || 1;

    const done = stage.processes.filter(p => p.status === 'Done').length;
    return Math.round((done / total) * 100);
  }

  getStageProgress(stage: Stage): number {
    if(!stage || !stage.processes){
      return 0
    }
    // const InProgress = stage.processes.filter(p => p.status === 'InProgress').length;
    // const done = stage.processes.filter(p => p.status === 'Done').length;
    // const InProgressPercent = Math.round((InProgress / stage.processes.length) * 100);
    // const DonePercent = Math.round((done / stage.processes.length) * 100);
    // return InProgressPercent + DonePercent;

    const total = stage.processes.length || 1;

    const active = stage.processes.filter(p => p.status === 'InProgress' || p.status === 'Done').length;
    return Math.round((active / total) * 100);
  }

  getProgressPercent(process: ProcessDetails): number {
    return this.calculateProgressService.calculateProgress(process)
  }

  getProcessStatusCount(stage: Stage, status: string): number {
    if(!stage || !stage.processes){
      return 0
    }
    return stage.processes.filter(p => p.status === status).length;
  }

  openProcessDrawer = (process: ProcessDetails) => {
    this.selectedProcess.set(process);
    this.processDrawerVisible.set(true) 
}

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }
}
