import { Component, input } from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { ClientCardData } from '../data/interfaces/client-card-data';

@Component({
  selector: 'app-client-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule, NzIconModule],
  templateUrl: './client-card.html',
  styleUrl: './client-card.less'
})
export class ClientCardComponent {
  client = input<ClientCardData>({ clientId: '7f6b9c40-6a28-4f0f-9c8f-8d3a23c0a321',
    companyName: 'Acme Corporation',
    director: 'Tip Tipovich',
    contactPerson: 'George Smith',
    clientEmail: 'companyname@gmail.com',
    clientPhone: '+48 777 666 333',}
  );
}
