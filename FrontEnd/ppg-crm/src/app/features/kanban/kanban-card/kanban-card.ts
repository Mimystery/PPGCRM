import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProcessCardComponent } from "../process-card/process-card";
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzEmptyModule} from 'ng-zorro-antd/empty';
import { FormsModule } from '@angular/forms';
import { Stage } from '../data/interfaces/stage.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kanban-card',
  imports: [NzButtonModule, NzIconModule, ProcessCardComponent, NzCardModule, NzEmptyModule, 
    FormsModule, CommonModule],
  templateUrl: './kanban-card.html',
  styleUrl: './kanban-card.less'
})
export class KanbanCardComponent {
  public stage = input.required<Stage>();

  isEditingStageName = false

  startEditingDetailsField(field: string){

  }

}
