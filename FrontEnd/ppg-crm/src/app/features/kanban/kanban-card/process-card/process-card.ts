import {Component, input} from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import { ProcessDetails } from '../../data/interfaces/process.interface';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-process-card',
  imports: [NzButtonModule, NzIconModule, NzCardModule, NzFlexModule, CdkDrag],
  templateUrl: './process-card.html',
  styleUrl: './process-card.less'
})
export class ProcessCardComponent {
  public process = input.required<ProcessDetails>();

  processCardDragStarted(event: DragEvent) {
    event.dataTransfer?.setData('processId', this.process().processId);
    event.dataTransfer!.effectAllowed = 'move';
  }
}
