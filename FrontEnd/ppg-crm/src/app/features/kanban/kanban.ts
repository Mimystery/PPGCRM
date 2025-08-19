import { Component } from '@angular/core';
import { KanbanStageComponent } from "./kanban-stage/kanban-stage";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StagesService } from './data/services/stages-service';
import { NzModalComponent, NzModalModule } from "ng-zorro-antd/modal";
import { FormsModule } from '@angular/forms';
import { NzInputModule } from "ng-zorro-antd/input"; 

@Component({
  selector: 'app-kanban',
  imports: [KanbanStageComponent, NzButtonModule, NzIconModule, NzModalComponent, FormsModule,
    NzModalModule, NzInputModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.less'
})
export class KanbanComponent {

  isVisible = false;
  isOkDisabled = true;
  newProjectName = '';

  stagesService = new StagesService();
constructor() {

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
