import {Component, inject} from '@angular/core';
import { KanbanCardComponent } from "./kanban-card/kanban-card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StagesService } from './data/services/stages-service';
import { NzModalComponent, NzModalModule } from "ng-zorro-antd/modal";
import { FormsModule } from '@angular/forms';
import { NzInputModule } from "ng-zorro-antd/input";
import { SelectedProjectService } from '../../core/services/selected-project/selected-project';
import { StageCard } from './data/interfaces/stage-card.interface';

@Component({
  selector: 'app-kanban',
  imports: [KanbanCardComponent, NzButtonModule, NzIconModule, NzModalComponent, FormsModule,
    NzModalModule, NzInputModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.less'
})
export class KanbanComponent {

  isVisible = false;
  isOkDisabled = true;
  newProjectName = '';

  stages: StageCard[] | null = null;

  stagesService = inject(StagesService);
  selectedProjectService = inject(SelectedProjectService);
constructor() {
  this.stagesService.getAllStages(this.selectedProjectService.selectedProjectId()!)
    .subscribe({
      next: (val) => {
        this.stages = val;
      },
      error: (error) => {
        console.error(error);
      }
    })
}

  checkIsInputEmpty(){
    this.isOkDisabled = this.newProjectName.trim() === '';
  }

  showCreateProjectModal(): void {
    this.isVisible = true;
  }

  handleCreateProjectModalOk(): void {
    this.isVisible = false;

    this.newProjectName = '';
    this.checkIsInputEmpty();
  }

  handleCreateProjectModalCancel(): void {
    this.isVisible = false;

    this.newProjectName = '';
    this.checkIsInputEmpty()
  }

}
