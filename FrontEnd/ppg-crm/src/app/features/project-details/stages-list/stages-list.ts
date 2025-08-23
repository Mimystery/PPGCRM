import {Component, input, signal} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzCardModule} from 'ng-zorro-antd/card';
import {ProcessDrawerComponent} from './process-drawer/process-drawer';
import {Stage} from './data/interfaces/stage.interface';
import { CommonModule } from '@angular/common';
import { ProcessDetails } from './data/interfaces/process.interface';

@Component({
  selector: 'app-stages-list',
  imports: [NzIconModule, NzButtonModule, NzDropDownModule, CommonModule,
    NzFlexModule, NzProgressModule, NzCollapseModule, NzTagModule, NzCardModule, ProcessDrawerComponent,
  ],
  templateUrl: './stages-list.html',
  styleUrl: './stages-list.less'
})
export class StagesListComponent {
  public processDrawerVisible =  signal(false);
  public stages = input.required<Stage[] | null>();
  public selectedProcess = signal<ProcessDetails | null>(null);

  openProcessDrawer = (process: ProcessDetails) =>{
    this.selectedProcess.set(process);
    this.processDrawerVisible.set(true)}
  ;

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }
}
