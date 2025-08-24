import {Component, ElementRef, EventEmitter, HostListener, inject, input, Output, ViewChild} from '@angular/core';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzFlexModule} from 'ng-zorro-antd/flex';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import { NzDividerComponent } from "ng-zorro-antd/divider";
import {ProcessDetails} from '../data/interfaces/process.interface';
import {CommonModule} from '@angular/common';
import { UserService } from '../../../../core/auth/data/services/user-service';
import { User } from '../../../../core/auth/data/interfaces/user.interface';

@Component({
  selector: 'app-process-drawer',
  imports: [NzDrawerModule, NzLayoutModule, NzButtonModule, NzDescriptionsModule, NzDropDownModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule, CommonModule,
    NzCardModule, NzProgressModule, NzLayoutModule, NzTagModule, NzFlexModule, NzTableModule,
    NzSpaceModule, NzCheckboxModule, NzDividerComponent],
  templateUrl: './process-drawer.html',
  styleUrl: './process-drawer.less'
})
export class ProcessDrawerComponent {
  usersService = inject(UserService)

  isVisible  = input.required<boolean>();
  process = input.required<ProcessDetails | null>();
  @Output() close = new EventEmitter<void>();
  users: User[] = []

  constructor(){
    this.usersService.getAllUsers().subscribe(val => {
      this.users = val
      console.log(this.users)
    })
  }

  get availableUsers(): User[] {
  const responsible = this.process()?.responsibleUsers ?? [];
  return this.users.filter(u => !responsible.some(r => r.userId === u.userId));
}

  @ViewChild('process') processNameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('startDate') startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('planEndDate') planEndDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('factEndDate') factEndDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('notes') notesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('problems') problemsInput!: ElementRef<HTMLInputElement>;
  @ViewChild('notDoneReasons') notDoneReasonsInput!: ElementRef<HTMLInputElement>;

  dropdownVisible = false;
  onUserSelect(user: User){
    this.process()?.responsibleUsers.push(user)
    this.dropdownVisible = false;
  }

  deleteResponsibleUser(user: User){
    if (this.process()?.responsibleUsers) {
    this.process()!.responsibleUsers = this.process()!.responsibleUsers.filter(
      u => u.userId !== user.userId
    );
  }
  }


  isEditingProcessName = false;
  isEditingStartDate = false;
  isEditingPlanEndDate = false;
  isEditingFactEndDate = false;
  isEditingNotes = false;
  isEditingNotDoneReasons = false;
  isEditingProblems = false;

  startEditing(field: string) {
    switch (field) {
      case 'processName':
        this.isEditingProcessName = !this.isEditingProcessName;
        setTimeout(() => this.processNameInput?.nativeElement.focus());
        break;
      case 'startDate':
        this.isEditingStartDate = !this.isEditingStartDate;
        setTimeout(() => this.startDateInput?.nativeElement.focus());
        break;
      case 'planEndDate':
        this.isEditingPlanEndDate = !this.isEditingPlanEndDate;
        setTimeout(() => this.planEndDateInput?.nativeElement.focus());
        break;
      case 'factEndDate':
        this.isEditingFactEndDate = !this.isEditingFactEndDate;
        setTimeout(() => this.factEndDateInput?.nativeElement.focus());
        break;
      case 'notes':
        this.isEditingNotes = !this.isEditingNotes;
        setTimeout(() => this.notesInput?.nativeElement.focus());
        break;
      case 'problems':
        this.isEditingProblems = !this.isEditingProblems;
        setTimeout(() => this.problemsInput?.nativeElement.focus());
        break;
      case 'notDoneReasons':
        this.isEditingNotDoneReasons = !this.isEditingNotDoneReasons;
        setTimeout(() => this.notDoneReasonsInput?.nativeElement.focus());
        break;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeys(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== 'Escape') return;

    if (this.isEditingProcessName) {
      this.finishEditing('processName');
    }
    if (this.isEditingStartDate) {
      this.finishEditing('startDate');
    }
    if (this.isEditingPlanEndDate) {
      this.finishEditing('planEndDate');
    }
    if (this.isEditingFactEndDate) {
      this.finishEditing('factEndDate');
    }
    if (this.isEditingNotes) {
      this.finishEditing('notes');
    }
    if (this.isEditingProblems) {
      this.finishEditing('problems');
    }
    if (this.isEditingNotDoneReasons) {
      this.finishEditing('notDoneReasons');
    }

    event.preventDefault();
  }

  finishEditing(field: string) {
    switch (field) {
      case 'processName':
        this.isEditingProcessName = false;
        break;
      case 'startDate':
        this.isEditingStartDate = false;
        break;
      case 'planEndDate':
        this.isEditingPlanEndDate = false;
        break;
      case 'factEndDate':
        this.isEditingFactEndDate = false;
        break;
      case 'notes':
        this.isEditingNotes = false;
        break;
      case 'problems':
        this.isEditingProblems = false;
        break;
      case 'notDoneReasons':
        this.isEditingNotDoneReasons = false;
        break;
    }
  }

  handleClose() {
    this.close.emit();
  }


  protected readonly window = window;
}
