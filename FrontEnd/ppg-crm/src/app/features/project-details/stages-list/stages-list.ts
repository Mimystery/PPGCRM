import {Component, signal} from '@angular/core';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzCollapseModule} from 'ng-zorro-antd/collapse';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NgTemplateOutlet} from '@angular/common';
import {ProcessDrawerComponent} from './process-drawer/process-drawer';

@Component({
  selector: 'app-stages-list',
  imports: [NzIconModule, NzButtonModule, NzDropDownModule,
    NzFlexModule, NzProgressModule, NzCollapseModule, NzTagModule, NzCardModule, NgTemplateOutlet, ProcessDrawerComponent,
  ],
  templateUrl: './stages-list.html',
  styleUrl: './stages-list.less'
})
export class StagesListComponent {
  public processDrawerVisible =  signal(false);

  openProcessDrawer = () => this.processDrawerVisible.set(true);

  closeProcessDrawer = () => {
    this.processDrawerVisible.set(false);
  }
}
