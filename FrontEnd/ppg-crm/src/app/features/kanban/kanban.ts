import { Component } from '@angular/core';
import { KanbanStageComponent } from "./kanban-stage/kanban-stage";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StagesService } from './data/services/stages-service';

@Component({
  selector: 'app-kanban',
  imports: [KanbanStageComponent, NzButtonModule, NzIconModule],
  templateUrl: './kanban.html',
  styleUrl: './kanban.less'
})
export class KanbanComponent {

  stagesService = new StagesService();
constructor() {

}
}
