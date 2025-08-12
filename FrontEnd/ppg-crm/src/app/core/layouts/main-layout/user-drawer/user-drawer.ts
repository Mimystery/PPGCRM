import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';


@Component({
  selector: 'app-user-drawer',
  imports: [NzDrawerModule, NzProgressModule, NzDividerModule, NzButtonModule],
  templateUrl: './user-drawer.html',
  styleUrls: ['./user-drawer.css']
})
export class UserDrawerComponent {
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();

  handleClose() {
    this.close.emit();
  }

}
