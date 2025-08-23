import {Component, inject, input, signal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { User } from '../../../core/auth/data/interfaces/user.interface';

@Component({
  selector: 'app-team-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule, NzIconModule, NzTagModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.less'
})
export class TeamCardComponent {
  user = input.required<User | null>();

  public teamDrawerVisible = signal(false);

  openTeamDrawer = () => this.teamDrawerVisible.set(true);
  closeTeamDrawer = () => this.teamDrawerVisible.set(false);

}
