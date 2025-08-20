import { Component, inject } from '@angular/core';
import { KanbanCardComponent } from "./kanban-card/kanban-card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StagesService } from './data/services/stages-service';
import { NzModalComponent, NzModalModule } from "ng-zorro-antd/modal";
import { FormsModule } from '@angular/forms';
import { NzInputModule } from "ng-zorro-antd/input";
import { Stage } from './data/interfaces/stage.interface';
import { SelectedProjectService } from '../../core/services/selected-project/selected-project';

@Component({
  selector: 'app-kanban',
  imports: [KanbanCardComponent, NzButtonModule, NzIconModule, NzModalComponent, FormsModule,
    NzModalModule, NzInputModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.less'
})
export class KanbanComponent {

  isCreateStageModalVisible = false;
  isOkButtonInCreateStageModalDisabled = true;
  newStageName = '';

  stages: Stage[] = []; 

  stagesService = new StagesService();
  selectedProjectService = inject(SelectedProjectService)

  constructor() {
    this.stagesService.getStages().subscribe(val => {
      this.stages = val
    })
  }

  checkIsInputEmpty(){
    this.isOkButtonInCreateStageModalDisabled = this.newStageName.trim() === '';
  }

  showCreateStageModal(): void {
    this.isCreateStageModalVisible = true;
  }

  handleCreateStageModalOk(): void {
    this.isCreateStageModalVisible = false;

    this.stagesService.createStage(this.newStageName).subscribe({
      next: (res) => {
        this.stagesService.getStages()
      .subscribe(val => {
        this.stages = val
      })
      },
      error: (err) => {
        console.log('Ошибка:', err);
      }
    });

    this.newStageName = '';
    this.checkIsInputEmpty();
  }

  handleCreateStageModalCancel(): void {
    this.isCreateStageModalVisible = false;

    this.newStageName = '';
    this.checkIsInputEmpty()
  }

}
