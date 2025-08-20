import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCardComponent } from "../process-card/process-card";
import {NzCardModule} from 'ng-zorro-antd/card';
import { StageCard } from '../data/interfaces/stage-card.interface';
import {NzEmptyModule} from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-kanban-card',
  imports: [NzButtonModule, NzIconModule, ProcessCardComponent, NzCardModule, NzEmptyModule],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.less'
})
export class KanbanCardComponent {

}
