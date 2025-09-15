import {Component, inject, input, output, signal} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { User } from '../../../core/auth/data/interfaces/user.interface';
import { IdentityService } from '../../../core/auth/data/services/identity-service';

@Component({
  selector: 'app-team-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule, NzIconModule, NzTagModule],
  templateUrl: './team-card.html',
  styleUrl: './team-card.less'
})
export class TeamCardComponent {
  user = input.required<User>();
  userSelected = output<User>();
  identityService = inject(IdentityService)
  currentUserRole = this.identityService.getUserRole();

  onTeamCardClicked(){
    this.userSelected.emit(this.user());
  }

  getColor(value: string): string {
  switch(value) {
    case 'Admin': return '#00C040';
    case 'GIP': return '#FFA94D';
    case 'Employee': return '#3a58dbff';
    default: return '#FFA94D';
  }
}
}
