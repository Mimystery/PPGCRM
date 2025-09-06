import {Component, inject, input, signal} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzCardModule} from 'ng-zorro-antd/card';
import {ProcessDrawerComponent} from './process-drawer/process-drawer';
import {Stage} from './data/interfaces/stage.interface';
import { CommonModule } from '@angular/common';
import { ProcessDetails } from './data/interfaces/process.interface';
import { CalculateProgressService } from '../data/services/calculate-progress-service';
import { max } from 'rxjs';
import { NzOptionComponent, NzSelectModule } from "ng-zorro-antd/select";
import { NzSelectComponent } from "../../../../../node_modules/ng-zorro-antd/select/index";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stages-list',
  imports: [NzIconModule, NzButtonModule, NzDropDownModule, CommonModule,
    NzFlexModule, NzProgressModule, NzCollapseModule, NzTagModule, NzCardModule, 
    ProcessDrawerComponent, NzOptionComponent, FormsModule, NzSelectModule],
  templateUrl: './stages-list.html',
  styleUrl: './stages-list.less'
})
export class StagesListComponent {
  calculateProgressService = inject(CalculateProgressService)

  public processDrawerVisible =  signal(false);
  public stages = input.required<Stage[] | null>();
  public selectedProcess = signal<ProcessDetails | null>(null);

  public selectedStageId = signal<string>('All');

  constructor(){
    
  }

  get filteredStages(): Stage[] {
    if (!this.stages()) return [];
    if (this.selectedStageId() === 'All'){
      return this.stages()!;
    }
    return this.stages()!.filter(s => s.stageId === this.selectedStageId());
  }

  onProcessDeleted(processId: string) {
  for (let stage of this.stages()!) {
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
    console.log(process)
    this.selectedProcess.set(process);
    this.processDrawerVisible.set(true) 
}

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }
}
