import { Component, inject } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import {ClientCardComponent} from './client-card/client-card';
import { ClientsService } from './data/services/clients-service';
import { ClientCardData } from './data/interfaces/client-card-data';

@Component({
  selector: 'app-clients',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule, CommonModule, ClientCardComponent,
  ],
  templateUrl: './clients.html',
  styleUrl: './clients.less'
})
export class ClientsComponent {
//clients
clientService = inject(ClientsService)
searchQuery = '';

isVisible = false;
isOkDisabled = true;
newClientName = '';

clients: ClientCardData[] = [];

constructor(){
  this.clientService.getClients().subscribe(val => {
    this.clients = val
  })
}

get filteredClients(): ClientCardData[] {
      if (!this.searchQuery.trim()) {
        return this.clients;
      }
      return this.clients.filter(p =>
        p.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

checkIsInputEmpty(){
    this.isOkDisabled = this.newClientName.trim() === '';
  }

 showCreateClientModal(): void {
    this.isVisible = true;
  }

  handleCreateClientModalOk(): void {
    this.isVisible = false;

    this.clientService.createClient(this.newClientName).subscribe({
      next: (res) => {
        this.clientService.getClients().subscribe(val => {
        this.clients = val
      })
      },
      error: (err) => {
        console.log('Ошибка:', err);
      }
    });

    this.newClientName = '';
    this.checkIsInputEmpty();
  }

  handleCreateClientModalCancel(): void {
    this.isVisible = false;

    this.newClientName = '';
    this.checkIsInputEmpty()
  }


}
