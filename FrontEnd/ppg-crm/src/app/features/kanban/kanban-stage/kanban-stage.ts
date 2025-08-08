import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCard } from "../process-card/process-card";

@Component({
  selector: 'app-kanban-stage',
  imports: [NzButtonModule, NzIconModule, ProcessCard,],
  templateUrl: './kanban-stage.html',
  styleUrl: './kanban-stage.less'
})
export class KanbanStageComponent {

}
