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
import { TeamCardComponent } from './team-card/team-card';
import { ClientsService } from '../clients/data/services/clients-service';
import { ClientCardData } from '../clients/data/interfaces/client-card-data';
import { User } from '../../core/auth/data/interfaces/user.interface';
import { UserService } from '../../core/auth/data/services/user-service';
import { IdentityService } from '../../core/auth/data/services/identity-service';

@Component({
  selector: 'app-team',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule, CommonModule, TeamCardComponent],
  templateUrl: './team.html',
  styleUrl: './team.less'
})
export class TeamComponent {
userService = inject(UserService)
identityService = inject(IdentityService)

isVisible = false;
isOkDisabled = true;
newClientName = '';

users: User[] = [];

constructor(){
  this.userService.getAllUsers().subscribe(val => {
    this.users = val
  })
}

checkIsInputEmpty(){
    this.isOkDisabled = this.newClientName.trim() === '';
  }

 showCreateUserModal(): void {
    this.isVisible = true;
  }

  handleCreateUserModalOk(): void {
    this.isVisible = false;

    // this.identityService.registerByAdmin(this.newClientName).subscribe({
    //   next: (res) => {
    //     this.clientService.getClients().subscribe(val => {
    //     this.clients = val
    //   })
    //   },
    //   error: (err) => {
    //     console.log('Ошибка:', err);
    //   }
    // });

    this.newClientName = '';
    this.checkIsInputEmpty();
  }

  handleCreateUserModalCancel(): void {
    this.isVisible = false;

    this.newClientName = '';
    this.checkIsInputEmpty()
  }


}
