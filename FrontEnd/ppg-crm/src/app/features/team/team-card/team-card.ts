import { Component, input } from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTagModule} from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-team-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule, NzIconModule, NzTagModule,],
  templateUrl: './team-card.html',
  styleUrl: './team-card.less'
})
export class TeamCardComponent {
  name = input('Tip Tipovich');
  email = input('tiptipovich@gmail.com');
  phone = input('+48 777 333 222');
  balance = input('22.000$');
  tag = input('GIP');

}
