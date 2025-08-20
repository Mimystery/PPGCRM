import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCardComponent } from "../process-card/process-card";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FormsModule } from '@angular/forms';
import { Stage } from '../data/interfaces/stage.interface';
import { CommonModule } from '@angular/common';
import { StagesService } from '../data/services/stages-service';
import { ProcessesService } from '../data/services/processes-service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';

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
    NzModalModule
  ],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.less'
})
export class KanbanCardComponent {
  public stage = input.required<Stage>();
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
}
