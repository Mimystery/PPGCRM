import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCardComponent } from "./process-card/process-card";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FormsModule } from '@angular/forms';
import { Stage } from '../data/interfaces/stage.interface';
import { CommonModule } from '@angular/common';
import { StagesService } from '../data/services/stages-service';
import { ProcessesService } from '../data/services/processes-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ProcessDetails} from '../data/interfaces/process.interface';

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
    CdkDrag
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

  isEditingStageName = false;

  @ViewChild('stageInput') stageInput!: ElementRef<HTMLInputElement>;

  // 🔹 New process modal state
  createNewProcessModalVisible = false;
  createNewProcessModalOkDisabled = true;
  createNewProcessName = '';

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
    }
  }
}
