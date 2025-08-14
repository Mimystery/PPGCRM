import { Component, input } from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { ClientCardData } from '../data/interfaces/client-card-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-card',
  imports: [NzCardModule, NzBadgeModule, NzProgressModule, NzAvatarModule, NzButtonModule,
    NzIconModule, CommonModule],
  templateUrl: './client-card.html',
  styleUrl: './client-card.less'
})
export class ClientCardComponent {
  client = input<ClientCardData>();

  get activeProjects(){
    const clientData = this.client();
    return clientData ? clientData.projects?.filter(p => !p.isArchived) : [];
  }

  get historyProjects(){
    const clientData = this.client();
    return clientData ? clientData.projects?.filter(p => p.isArchived) : [];
  }
}
