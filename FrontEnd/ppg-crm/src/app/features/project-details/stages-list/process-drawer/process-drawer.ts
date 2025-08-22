import {Component, EventEmitter, input, Output} from '@angular/core';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import { NzDividerComponent } from "ng-zorro-antd/divider";

@Component({
  selector: 'app-process-drawer',
  imports: [NzDrawerModule, NzLayoutModule, NzButtonModule, NzDescriptionsModule, NzDropDownModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule,
    NzCardModule, NzProgressModule, NzLayoutModule, NzTagModule, NzFlexModule, NzTableModule,
    NzSpaceModule, NzCheckboxModule, NzDividerComponent],
  templateUrl: './process-drawer.html',
  styleUrl: './process-drawer.less'
})
export class ProcessDrawerComponent {
  isVisible  = input.required<boolean>();
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

  datas: any = [
    {
      key: '1',
      name: 'Define project objectives and KPIs',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '3',
      name: 'Estimate timelines and resources',
      isDone: false
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
    {
      key: '2',
      name: 'List all required features',
      isDone: true
    },
  ]

  protected readonly window = window;
}
