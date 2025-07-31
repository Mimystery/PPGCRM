import { Component, Input } from '@angular/core';

import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';


@Component({
  selector: 'app-user-drawer',
  imports: [NzDrawerModule, NzProgressModule, NzDividerModule],
  templateUrl: './user-drawer.html',
  styleUrls: ['./user-drawer.css']
})
export class UserDrawerComponent {
  @Input() visible: boolean = false;


}
