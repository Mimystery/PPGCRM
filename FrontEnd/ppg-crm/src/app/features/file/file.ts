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
import { FilesService } from './data/services/files-service';
import { ProcessFile } from './data/interfaces/process-file.interface';
import { NzCardComponent } from "ng-zorro-antd/card";
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmComponent, NzPopconfirmModule } from "ng-zorro-antd/popconfirm";

@Component({
  selector: 'app-file',
  imports: [NzCollapseComponent, DatePipe, NzProgressComponent, NzTagComponent,
    ProcessDrawerComponent, NzButtonModule, NzCollapseModule, FormsModule, NzInputModule, NzIconModule, 
    NzCardComponent, NzPopconfirmModule],
  templateUrl: './file.html',
  styleUrl: './file.less'
})
export class FileComponent {
  calculateProgressService = inject(CalculateProgressService)
  stageService = inject(StagesService)
  filesService = inject(FilesService)

  public processDrawerVisible =  signal(false);
  public stages: Stage[] | null = null;
  public selectedProcess = signal<ProcessDetails | null>(null);
  searchQuery = '';
  modal = inject(NzModalService);
  message = inject(NzMessageService);

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

  getDeleteFileTitle(file: ProcessFile){
    return `Are you sure you want to delete "${file.fileName}" file?`;
  }

  downloadFile(file: ProcessFile){
    console.log(file.processFileId)
    this.filesService.downloadFile(file.processFileId).subscribe({
    next: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.fileName;
      a.click();
      window.URL.revokeObjectURL(url);

      this.message.success('File downloaded successfully!');
    },
    error: (err) => {
      console.error('Download error', err)
      this.message.error('Error downloading file!');
    }
  });
  }

  confirmDeleteFile(file: ProcessFile){
    this.deleteFile(file)
  }

  deleteFile(file: ProcessFile){
    this.filesService.deleteFile(file.processFileId).subscribe({
    next: () => {
      const process = this.selectedProcess();
      if (process) {
        process.processFiles = process.processFiles.filter(f => f.processFileId !== file.processFileId);
      }
      this.message.success('File successfully deleted!');
    },
    error: (err) => {
      console.error('Delete error', err)
      this.message.error('Error deleting file!');
    }
  });
  }

  showOpenFiletModal(fileInput: HTMLInputElement){
    fileInput.click();
  } 

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || !this.selectedProcess()) return;

    const file = input.files[0];
    const process = this.selectedProcess()!;

    const exists = await this.filesService.checkFile(process!.processId, file.name).toPromise();

    if (exists) {
    this.modal.confirm({
      nzTitle: 'Файл с таким именем уже существует',
      nzContent: `Хотите перезаписать файл "${file.name}"?`,
      nzOkText: 'Да',
      nzCancelText: 'Нет',
      nzOnOk: () => this.saveFile(process!.processId, file),
      nzOnCancel: () => {}
    });
  } else {
    this.saveFile(process!.processId, file);
  }
  }

  async onFileDrop(event: DragEvent){
    event.preventDefault();
    if (!event.dataTransfer?.files.length || !this.selectedProcess()) return;

    const file = event.dataTransfer.files[0];
    const process = this.selectedProcess();

    const exists = await this.filesService.checkFile(process!.processId, file.name).toPromise();

    if (exists) {
    this.modal.confirm({
      nzTitle: 'Файл с таким именем уже существует',
      nzContent: `Хотите перезаписать файл "${file.name}"?`,
      nzOkText: 'Да',
      nzCancelText: 'Нет',
      nzOnOk: () => this.saveFile(process!.processId, file),
      nzOnCancel: () => {}
    });
  } else {
    this.saveFile(process!.processId, file);
  }

    //this.selectedProcess()?.processFiles.push(newFile);
  }

  saveFile(processId: string, file: File){
    const process = this.selectedProcess()
    this.filesService.addFileToProcess(processId, file).subscribe({
      next: () => {
        this.filesService.getProcessFiles(processId).subscribe({
          next(value) {
            process!.processFiles = value
          },
          error: (err) => console.error('Error', err)
        })
      },
      error: (err) => console.error('Error', err)
    })
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
