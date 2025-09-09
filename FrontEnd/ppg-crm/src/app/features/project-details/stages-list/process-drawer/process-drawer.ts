import {Component, effect, ElementRef, EventEmitter, HostListener, inject, Input, input, OnInit, Output, signal, ViewChild} from '@angular/core';
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
import { NzOptionComponent, NzSelectModule } from "ng-zorro-antd/select";
import { NzDatePickerComponent, NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, Subject } from 'rxjs';
import { ProcessesService } from '../../../kanban/data/services/processes-service';
import {TasksService} from './data/services/tasks-service';
import { Task } from './data/interfaces/task.interface';
import { ProjectUserService } from '../../data/services/project-user-service';
import { CalculateProgressService } from '../../data/services/calculate-progress-service';
import { CalculateSalaryService } from '../../data/services/calculate-salary-service';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { PauseService } from '../../data/services/pause-service';
import { ProcessPause } from './data/interfaces/process-pause.interface';

@Component({
  selector: 'app-process-drawer',
  imports: [NzDrawerModule, NzLayoutModule, NzButtonModule, NzDescriptionsModule, NzDropDownModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule, CommonModule,
    NzCardModule, NzProgressModule, NzLayoutModule, NzTagModule, NzFlexModule, NzTableModule,
    NzSpaceModule, NzCheckboxModule, NzDividerComponent, NzOptionComponent, NzSelectModule,
    NzDatePickerModule, NzPopconfirmModule],
  templateUrl: './process-drawer.html',
  styleUrl: './process-drawer.less'
})
export class ProcessDrawerComponent {
  usersService = inject(UserService)
  projectUsersService = inject(ProjectUserService)
  message = inject(NzMessageService);
  processesService = inject(ProcessesService)
  calculateProgressService = inject(CalculateProgressService)
  salaryService = inject(CalculateSalaryService)
  pauseService = inject(PauseService)

  isVisible  = input.required<boolean>();
  process = input.required<ProcessDetails>();

  createNewTaskModalVisible = false;
  createNewTaskModalOkDisabled = true;
  createNewTaskName = '';

  tasksService = inject(TasksService);

  @Output() deleted = new EventEmitter<string>();


  confirmDelete(){
    this.processesService.deleteProcess(this.process().processId).subscribe({
      next: () => {
        this.message.success('ProcessDeleted!');
        this.deleted.emit(this.process().processId);
        this.handleClose();
        
      },
      error: (err) => {
        this.message.error('Ошибка при обновлении данных: ', err.message)
      }
    })
  }

  checkIfNewTaskNameEmpty() {
    this.createNewTaskModalOkDisabled = this.createNewTaskName.trim() === '';
  }

  openCreateNewTaskModal(): void {
    this.createNewTaskModalVisible = true;
  }

  handleCreateNewTaskModalOk(): void {
    this.createNewTaskModalVisible = false;

    this.tasksService.addTask(this.process()?.processId!, this.createNewTaskName).subscribe({
      next: val => {
        const tasks = this.process()?.tasks || [];
        this.process()!.tasks = [val, ...tasks];
        this.message.success('Task added!')
      },
      error: (err) => {
        this.message.error('Ошибка при обновлении данных: ', err.message)
      }
    });

    this.createNewTaskName = '';
    this.checkIfNewTaskNameEmpty();
  }

  handleCreateNewTaskModalCancel(): void {
    this.createNewTaskModalVisible = false;

    this.createNewTaskName = '';
    this.checkIfNewTaskNameEmpty();
  }


  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<ProcessDetails>();
  users: User[] = []

  private notesUpdate$ = new Subject<string>();
  private notDoneReasons$ = new Subject<string>();
  private problems$ = new Subject<string>();

  updateProcess(process: ProcessDetails){
    console.log(process)
    this.processesService.updateProcess(process.processId, process)
      .subscribe({
        next: () => {
          this.message.success('Data updated!');
          this.updated.emit(process);
        },
        error: () => this.message.error('Error updating')
      });
  }

private notesInitialized = false;

private normalizeDateOnly(value?: Date | string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

  constructor(){

    this.usersService.getAllUsers().subscribe(val => {
      this.users = val
      console.log(this.users)
    })

    this.notesUpdate$
      .pipe(debounceTime(500))
      .subscribe(newNotes => {
        if (this.process()) {
          this.updateProcess(this.process()!)
        }
      });
    this.notDoneReasons$
      .pipe(debounceTime(500))
      .subscribe(newReasons => {
        if(this.process()){
          this.updateProcess(this.process()!)
        }
      })
    this.problems$
      .pipe(debounceTime(500))
      .subscribe(newProblems => {
        if(this.process()){
          this.updateProcess(this.process()!)
        }
      })

      effect(() => {
        this.checkExpired();
      });

  }

  checkExpired(){
    const p = this.process?.(); // process — signal (input)
    if (!p) return;

    // не мешаем, если пользователь сейчас редактирует даты вручную
    if (this.isEditingPlanEndDate || this.isEditingFactEndDate) return;

    const planDate = this.normalizeDateOnly(p.planEndDate);
    const factDate = this.normalizeDateOnly(p.factEndDate);
    const today = this.normalizeDateOnly(new Date())!;

    // если есть плановая дата, она уже в прошлом (только дата), факт окончания нет,
    // и статус ещё не Expired/Done/Paused — ставим Expired и сохраняем
    if (
      planDate &&
      planDate.getTime() < today.getTime() &&
      !factDate &&
      p.status !== 'Expired' &&
      p.status !== 'Done' &&
      p.status !== 'Paused'
    ) {
      console.log('Auto-set Expired for process', p.processId, planDate, today);
      p.status = 'Expired';
      // отправляем обновление на сервер
      this.updateProcess(p);
    }
  }

  onNotesChange(value: string) {
    if (this.process()) {
      this.process()!.notes = value;
      this.notesUpdate$.next(value);
    }
  }

  onNotDoneReasonsChange(value: string){
    if (this.process()) {
      this.process()!.notDoneReasons = value;
      this.notDoneReasons$.next(value);
    }
  }

  onProblemsChange(value: string){
    if (this.process()) {
      this.process()!.problems = value;
      this.problems$.next(value);
    }
  }

  get sortedTasks() {
  return this.process()?.tasks
    ?.slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

  deletePauseHandle(pauseId: string){
    this.pauseService.deletePause(pauseId).subscribe({
      next: () => {
        const p = this.process();
        if (p && p.processPauses) {
          const newPauses = p.processPauses.filter(x => x.pauseId !== pauseId);
          p.processPauses = newPauses; // присваиваем новый массив — UI обновится
        }
        this.message.success('Pause removed!');
      },
      error: () => this.message.error('Error')
    })
  }

  getPauseDays(start: Date, end: Date | null){
    return this.pauseService.getPauseDays(start, end);
  }

  getTotalPauseDays(){
    return this.pauseService.getTotalPauseDays(this.process())
  }

  getUserWorkInfo(user: User){
    if(!this.process()){
      return { daysWorked: 0, totalSalary: 0 };
    }

    return this.salaryService.calculateSalary(user, this.process());
  }

  getTotalSalary(): number {
    if (!this.process() || !this.process().responsibleUsers) return 0;

    return this.salaryService.getTotalSalary(this.process())
  }

  onTaskDeleteClick(task: Task){
    //console.log(task.taskId)

    this.process().tasks = this.process().tasks.filter(t => t.taskId !== task.taskId)

    this.tasksService.removeTask(task.taskId).subscribe({
        next: () => this.message.success('Task removed!'),
        error: () => this.message.error('Error updating')
      });
  }

  get progressPercent(): number {
    const process = this.process();

    if (!process) {
      return 0;
    }
    
    const percent = this.calculateProgressService.calculateProgress(process)

    if (percent === 100 && process.status !== 'Done'){
      process.status = 'Done';
      process.factEndDate = new Date();
      this.finishEditing('status');
    }
    
    if (percent < 100 && process.status === 'Done'){
      process.status = 'InProgress';
      process.factEndDate = null;
      this.finishEditing('status')
    }

    return percent;
  }

  onCheckBoxClick(task: Task){
    //task.isDone = !task.isDone;
    this.tasksService.updateTask(task.taskId, task.taskName, task.isDone)
    .subscribe({
      next: () => this.message.success('Task updated!'),
      error: () => this.message.error('Error updating')
    });
  }

  onUserSelect(user: User){
    this.process()?.responsibleUsers.push(user)

    this.processesService.addResponsibleUser(user.userId, this.process()!.processId)
      .subscribe({
        next: () => this.message.success('User added!'),
        error: () => this.message.error('Error updating')
      });

    this.projectUsersService.addUser(user)
    //4eddde59-44f5-437a-9e80-7a6671a991b2 process
    //bf18146a-1df8-4eb9-b2af-6820107d7d72 stage
    //bd385c97-42ae-4098-8a35-3489945c299e user
    this.dropdownVisible = false;
  }

  deleteResponsibleUser(user: User){
    if (this.process()?.responsibleUsers) {
    this.process()!.responsibleUsers = this.process()!.responsibleUsers.filter(
      u => u.userId !== user.userId
    );
    this.processesService.removeResponsibleUser(user.userId, this.process()!.processId)
      .subscribe({
        next: () => this.message.success('User removed!'),
        error: () => this.message.error('Error updating')
      })
      this.projectUsersService.removeUser(user.userId);
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

        if(!this.isEditingProcessName){
          this.updateProcess(this.process()!)
        }

        setTimeout(() => this.processNameInput?.nativeElement.focus());
        break;
      case 'startDate':
        this.isEditingStartDate = !this.isEditingStartDate;

        if(!this.isEditingStartDate){
          this.updateProcess(this.process()!)
        }

        setTimeout(() => this.startDateInput?.nativeElement.focus());
        break;
      case 'planEndDate':
        this.isEditingPlanEndDate = !this.isEditingPlanEndDate;

        if(!this.isEditingPlanEndDate){
          this.updateProcess(this.process()!)
        }

        setTimeout(() => this.planEndDateInput?.nativeElement.focus());
        break;
      case 'factEndDate':
        this.isEditingFactEndDate = !this.isEditingFactEndDate;

        if(!this.isEditingFactEndDate){
          this.updateProcess(this.process()!)
        }

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

  previouseStatus: string | null = null;

  finishEditing(field: string) {
    switch (field) {
      case 'processName':
        this.isEditingProcessName = false;
        this.updateProcess(this.process()!)
        break;
      case 'startDate':
        this.isEditingStartDate = false;
        this.updateProcess(this.process()!)
        break;
      case 'planEndDate':
        this.isEditingPlanEndDate = false;
        this.updateProcess(this.process()!)
        break;
      case 'factEndDate':
        this.isEditingFactEndDate = false;
        this.updateProcess(this.process()!)
        break;
      case 'notes':
        this.isEditingNotes = false;
        this.updateProcess(this.process()!)
        break;
      case 'problems':
        this.isEditingProblems = false;
        this.updateProcess(this.process()!)
        break;
      case 'notDoneReasons':
        this.isEditingNotDoneReasons = false;
        this.updateProcess(this.process()!)
        break;
      case 'status':
        const newStatus = this.process().status;
        const processId = this.process().processId;
        const process = this.process()

        const today = new Date();

        if(newStatus === 'Paused' && this.previouseStatus !== 'Paused'){
          this.pauseService.addProcessPause(processId).subscribe({
            next: () => {
              this.pauseService.getAllProcessPauses(processId).subscribe({
                next: (pauses: ProcessPause[]) => {
                  this.process().processPauses = pauses;
                },
                error: err => console.error(err)
              })
            },
            error: err => console.error(err)
          });
        }

        if(this.previouseStatus === 'Paused' && newStatus !== 'Paused'){
          const activePause = this.process().processPauses.find(p => !p.endPauseDate);
          if(activePause){
            this.pauseService.updateProcessPause(activePause.pauseId).subscribe({
              next: () => {
                this.pauseService.getAllProcessPauses(processId).subscribe({
                next: (pauses: ProcessPause[]) => {
                  this.process().processPauses = pauses;
                },
                error: err => console.error(err)
              })
              },
              error: err => console.error('Error updating pause', err)
            })
          }
        }

        this.updateProcess(this.process()!)
        this.previouseStatus = newStatus;
        break;
    }
  }

  handleClose() {
    this.close.emit();
  }

getColor(value: string): string {
  switch(value) {
    case 'ToDo': return '#9E9E9E';
    case 'InProgress': return '#2679ff';
    case 'Paused': return '#FF9800';
    case 'Done': return '#00C040';
    case 'Expired': return '#F44336';
    case 'Cancelled': return '#fadd05';
    default: return '#000';
  }
}


  protected readonly window = window;
}
