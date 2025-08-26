import {Component, inject, signal} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {CommonModule} from '@angular/common';
import { TeamCardComponent } from './team-card/team-card';
import { ClientsService } from '../clients/data/services/clients-service';
import { ClientCardData } from '../clients/data/interfaces/client-card-data';
import { User } from '../../core/auth/data/interfaces/user.interface';
import { UserService } from '../../core/auth/data/services/user-service';
import { IdentityService } from '../../core/auth/data/services/identity-service';
import { NzFormItemComponent } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { last, Observable, Observer, Subject, takeUntil } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import {TeammateDrawerComponent} from './teammate-drawer/teammate-drawer';

@Component({
  selector: 'app-team',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule, CommonModule, TeamCardComponent,
    NzFormItemComponent, NzColDirective, ReactiveFormsModule, NzSelectModule, TeammateDrawerComponent, TeammateDrawerComponent],
  templateUrl: './team.html',
  styleUrl: './team.less'
})

export class TeamComponent {
userService = inject(UserService)
identityService = inject(IdentityService)
router = inject(Router)
message = inject(NzMessageService);

  selectedUser = signal<User | null>(null);

  setUser = (user: User) => {
    console.log('Selected user:', user);
    this.selectedUser.set(user);
    this.openTeamDrawer();
  };

  public teamDrawerVisible = signal(false);

  openTeamDrawer = () => {
    console.log('Opening team drawer');
    this.teamDrawerVisible.set(true)
  };
  closeTeamDrawer = () => {
    this.teamDrawerVisible.set(false)
    this.selectedUser.set(null)
  };
  isVisible = false;
isOkDisabled = true;
selectedValue = null;
newClientName = '';


users: User[] = [];

constructor(){
  this.userService.getAllUsers().subscribe(val => {
    this.users = val
  })
}

private fb = inject(NonNullableFormBuilder);
  private destroy$ = new Subject<void>();
  validateForm = this.fb.group({
    firstName: this.fb.control('', [Validators.required],),
    lastName: this.fb.control('', [Validators.required]),
    role: this.fb.control('', [Validators.required]),
    salary: this.fb.control<number>(0, [Validators.required]),
  });

  ngOnInit(): void {
    this.validateForm.controls.role.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.validateForm.controls.salary.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

 showCreateUserModal(): void {
    this.isVisible = true;
  }

  handleCreateUserModalOk(): void {
    if(this.validateForm.valid){

      const payload = {
        firstName: this.validateForm.controls.firstName.value,
        lastName: this.validateForm.controls.lastName.value,
        role: this.validateForm.controls.role.value,
        salary: this.validateForm.controls.salary.value
      }

      this.identityService.registerByAdmin(payload).subscribe({
        next: val => {
          this.router.navigate(['team/create-success'], { state: { regCode: val.registrationCode } });
          this.isVisible = false;
          this.validateForm.reset();
        },
        error: err => {
          console.error('Ошибка при регистрации:', err);
          this.message.error('Registration error');
        }
        });

    }
  }

  handleCreateUserModalCancel(): void {
    this.isVisible = false;
    this.validateForm.reset();
    //this.checkIsInputEmpty()
  }


}
