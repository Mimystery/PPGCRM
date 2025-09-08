import {Component, input, signal} from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import { ProcessDetails } from '../../data/interfaces/process.interface';
import {CdkDrag} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { ProcessDrawerComponent } from "../../../project-details/stages-list/process-drawer/process-drawer";
import { NzTagComponent, NzTagModule } from "ng-zorro-antd/tag";

@Component({
  selector: 'app-process-card',
  imports: [NzButtonModule, NzIconModule, NzCardModule, NzFlexModule, CdkDrag, DatePipe, 
    ProcessDrawerComponent, NzTagComponent, NzTagModule],
  templateUrl: './process-card.html',
  styleUrl: './process-card.less'
})
export class ProcessCardComponent {
  public process = input.required<ProcessDetails>();

    public processDrawerVisible =  signal(false);

  constructor(){
    
  }

  processCardDragStarted(event: DragEvent) {
    event.dataTransfer?.setData('processId', this.process().processId);
    event.dataTransfer!.effectAllowed = 'move';
  }

  processCardClickHandle(){

  }
}
