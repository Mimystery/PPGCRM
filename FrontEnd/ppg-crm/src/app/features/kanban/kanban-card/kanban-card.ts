import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCard } from "../process-card/process-card";
import {NzCardModule} from 'ng-zorro-antd/card';

@Component({
  selector: 'app-kanban-card',
  imports: [NzButtonModule, NzIconModule, ProcessCard, NzCardModule],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.less'
})
export class KanbanCardComponent {

}
