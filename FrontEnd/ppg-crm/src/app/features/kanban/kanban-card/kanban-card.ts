import {Component, ElementRef, EventEmitter, inject, input, Output, signal, ViewChild} from '@angular/core';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from 'ng-zorro-antd/icon';
import {ProcessCardComponent} from "./process-card/process-card";
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import {FormsModule} from '@angular/forms';
import {Stage} from '../data/interfaces/stage.interface';
import {CommonModule} from '@angular/common';
import {StagesService} from '../data/services/stages-service';
import {ProcessesService} from '../data/services/processes-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzInputModule} from 'ng-zorro-antd/input';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ProcessDetails} from '../data/interfaces/process.interface';
import { ProcessDrawerComponent } from "../../project-details/stages-list/process-drawer/process-drawer";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-kanban-card',
  imports: [
    NzButtonModule,
    NzIconModule,
    ProcessCardComponent,
    NzCardModule,
    NzEmptyModule,
    FormsModule,
    CommonModule,
    NzModalModule,
    NzInputModule,
    CdkDropList,
    CdkDrag,
    ProcessDrawerComponent,
    NzPopconfirmModule
],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.less'
})
export class KanbanCardComponent {
  public stage = input.required<Stage>();
  public stagesIDs = input.required<string[]>();
  message = inject(NzMessageService);
  stagesService = inject(StagesService);
  processesService = inject(ProcessesService);

  public processDrawerVisible =  signal(false);
  public selectedProcess = signal<ProcessDetails | null>(null);

  isEditingStageName = false;

  @ViewChild('stageInput') stageInput!: ElementRef<HTMLInputElement>;
  @Output() stageDeleted = new EventEmitter<string>();

  createNewProcessModalVisible = false;
  createNewProcessModalOkDisabled = true;
  createNewProcessName = '';

  getDeleteStageTitle(): string {
    return `Are you sure you want to delete "${this.stage().stageName}" stage?`;
  } 

  getSortedProcesses(stage: Stage){
    return stage.processes 
    ? [...stage.processes].sort((a,b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    : [];
  }

  startEditingDetailsField(field: string) {
    if (field === 'stageName') {
      this.isEditingStageName = !this.isEditingStageName;
    }

    setTimeout(() => {
      this.stageInput.nativeElement.focus();
    });
  }

  finishEditingDetailsField(field: string) {
    if (field === 'stageName') {
      this.isEditingStageName = false;
    }
    this.stagesService.updateStage(this.stage().stageId, this.stage().stageName)
      .subscribe({
        error: (err) => {
          this.message.error('Ошибка при обновлении данных: ' + err.message)
        },
        complete: () => {
          this.message.success('Данные успешно обновлены!')
        }
      });
  }

  openCreateNewProcessModal(): void {
    this.createNewProcessModalVisible = true;
  }

  handleCreateNewProcessModalOk(): void {
    this.createNewProcessModalVisible = false;

    this.processesService.addNewProcess(this.createNewProcessName, this.stage().stageId)
      .subscribe({
        next: () => {
          this.message.success('Процесс успешно создан!');
          this.processesService.getProcesses(this.stage().stageId).subscribe(val => {
            this.stage().processes = val
          })
        },
        error: (err) => {
          this.message.error('Ошибка при создании процесса: ' + err.message);
        }
      });

    this.createNewProcessName = '';
    this.checkIfNewProcessNameEmpty();
  }

  handleCreateNewProcessModalCancel(): void {
    this.createNewProcessModalVisible = false;
    this.createNewProcessName = '';
    this.checkIfNewProcessNameEmpty();
  }

  checkIfNewProcessNameEmpty() {
    this.createNewProcessModalOkDisabled = this.createNewProcessName.trim() === '';
  }

  processCardDrop(event: CdkDragDrop<ProcessDetails[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let movedProcess = event.container.data[event.currentIndex];
      movedProcess.stageId = event.container.id;
    }

    event.container.data.forEach((process, index) => {
      process.sortOrder = index;
      this.processesService.updateProcess(process.processId, process)
        .subscribe({
          complete: () => {},
          error: () => this.message.error('Error updating')
        });
    });
  }

  onProcessDeleted(processId: string) {
    this.stage().processes = this.stage().processes.filter(p => p.processId !== processId);
  }

  openProcessDrawer = (process: ProcessDetails) => {
    this.selectedProcess.set(process);
    this.processDrawerVisible.set(true) 
  }

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }

  confirmDeleteStage(stageId: string){
    this.stagesService.deleteStage(stageId).subscribe({
      next: () => {
        this.message.success('Stage Deleted!');
        this.stageDeleted.emit(stageId);
      },
      error: (err) => {
        this.message.error('Ошибка при обновлении данных: ', err.message)
      }
    })
  }
}
