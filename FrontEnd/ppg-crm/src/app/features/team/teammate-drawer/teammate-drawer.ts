import {Component, EventEmitter, inject, input, Input, Output} from '@angular/core';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {CommonModule} from '@angular/common';
import {User} from '../../../core/auth/data/interfaces/user.interface';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../core/auth/data/services/user-service';

@Component({
  selector: 'app-teammate-drawer',
  imports: [NzDrawerModule, NzCardModule, NzTagModule, FormsModule, CommonModule,
    NzProgressModule, NzDividerModule, NzFlexModule, NzSelectModule, NzIconModule, CommonModule,
    NzTableModule, NzImageModule],
  templateUrl: './teammate-drawer.html',
  styleUrl: './teammate-drawer.less'
})
export class TeammateDrawerComponent {
  isVisible = input.required();
  user = input.required<User | null>();
  userUpdate = this.user()!;
  userService = inject(UserService);

  @Output() closed = new EventEmitter<void>();

  isEditingName = false;
  isEditingUsername = false;
  isEditingRole = false;
  isEditingRate = false;
  isEditingPhone = false;
  isEditingEmail = false;
  handleClose() {
    this.closed.emit();
  }
  startEditingTeammateField(field: string) {
    if (field === 'name') {
      this.isEditingName = true;
    }
    if (field === 'username') {
      this.isEditingUsername = true;
    }
    if (field === 'role') {
      this.isEditingRole = true;
    }
    if (field === 'rate') {
      this.isEditingRate = true;

    }
    if (field === 'phone') {
      this.isEditingPhone = true;

    }
    if (field === 'email') {
      this.isEditingEmail = true;
    }
  }

  finishEditingTeammateField(field: string) {
    if (field === 'name') this.isEditingName = false;
    if (field === 'username') this.isEditingUsername = false;
    if (field === 'role') this.isEditingRole = false;
    if (field === 'rate') this.isEditingRate = false;
    if (field === 'phone') this.isEditingPhone = false;
    if (field === 'email') this.isEditingEmail = false;

    this.userService.updateUser(this.user()!.userId, this.userUpdate).subscribe();
  }
  protected readonly window = window;
}
