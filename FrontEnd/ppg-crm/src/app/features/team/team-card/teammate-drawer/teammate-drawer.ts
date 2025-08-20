import {Component, EventEmitter, input, Input, Output} from '@angular/core';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzProgressModule} from 'ng-zorro-antd/progress';

@Component({
  selector: 'app-teammate-drawer',
  imports: [NzDrawerModule, NzCardModule, NzTagModule, NzProgressModule],
  templateUrl: './teammate-drawer.html',
  styleUrl: './teammate-drawer.less'
})
export class TeammateDrawerComponent {
  isVisible = input.required();
  @Output() closed = new EventEmitter<void>();

  handleClose() {
    this.closed.emit();
  }

  protected readonly window = window;
}
