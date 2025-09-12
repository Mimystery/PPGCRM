import {Component, effect, EventEmitter, inject, input, Input, OnChanges, output, Output, signal, SimpleChanges} from '@angular/core';
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
import {CommonModule, DatePipe} from '@angular/common';
import {User} from '../../../core/auth/data/interfaces/user.interface';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../core/auth/data/services/user-service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {ProcessDetails} from '../../project-details/stages-list/data/interfaces/process.interface';
import {ProjectDetails} from '../../project-details/data/interfaces/project.details.interface';
import {Stage} from '../../project-details/stages-list/data/interfaces/stage.interface';
import { CalculateProgressService } from '../../project-details/data/services/calculate-progress-service';
import { IdentityService } from '../../../core/auth/data/services/identity-service';

@Component({
  selector: 'app-teammate-drawer',
  imports: [NzDrawerModule, NzCardModule, NzTagModule, FormsModule, CommonModule,
    NzProgressModule, NzDividerModule, NzFlexModule, NzSelectModule, NzIconModule, CommonModule,
    NzTableModule, NzImageModule, NzInputDirective, DatePipe],
  templateUrl: './teammate-drawer.html',
  styleUrl: './teammate-drawer.less'
})
export class TeammateDrawerComponent {
  // ngOnChanges(changes: SimpleChanges)  {
  //   this.userUpdate = { ...this.user() };
  //   if (this.userUpdate.userId != undefined){
  //     this.userService.getAllProjectsByUserId(this.userUpdate.userId).subscribe({
  //       error: (err)=> {
  //         this.message.error("Ошибка при получении процесов: " + err.message)
  //       },
  //       next: (val: ProjectDetails[]) =>{
  //         console.log(val);
  //         this.projects = val;
  //         for (let project of this.projects){
  //           for (let stage of project.stages!){
  //             this.stages.push(stage);
  //             for (let process of stage.processes) {
  //               this.processes.push(process);
  //             }
  //           }
  //         }
  //       },
  //     });
  //   } else {
  //     this.selectedStageId = ''
  //     this.selectedProjectId = ''
  //     this.processes = new Array<ProcessDetails>
  //     this.filteredProcessesByProjectId= new Array<ProcessDetails>
  //     this.stages = new Array<Stage>
  //     this.filteredStagesByProjectId = new Array<Stage>
  //   }
  // }
  isVisible = input.required();
  user = input.required<User>();

  @Output() updated = new EventEmitter<User>(); 


  projects = new Array<ProjectDetails>
  processes = new Array<ProcessDetails>
  filteredProcessesByProjectId = new Array<ProcessDetails>
  filteredProcessesByStageId = new Array<ProcessDetails>;
  stages = new Array<Stage>
  filteredStagesByProjectId = new Array<Stage>
  calculateProgressService = inject(CalculateProgressService)

  selectedProjectId:string = ''

  getProgressPercent(process: ProcessDetails): number {
    return this.calculateProgressService.calculateProgress(process)
  }

  projectIdSelected = () => {
    if (this.selectedProjectId===null)
      this.selectedProjectId=''
    this.filteredProcessesByProjectId = new Array<ProcessDetails>
    this.selectedStageId = ''
    this.filteredStagesByProjectId = this.stages.filter((stage)=>stage.projectId == this.selectedProjectId)
    for(let filteredStage of this.filteredStagesByProjectId){
      for (let filteredProcess of filteredStage.processes){
        this.filteredProcessesByProjectId.push(filteredProcess);
      }
    }
  }

  selectedStageId:string = ''

  stageIdSelected = () => {
    if (this.selectedStageId===null)
      this.selectedStageId=''
    this.filteredProcessesByStageId = [ ...this.stages.find((stage)=>stage.stageId == this.selectedStageId)!.processes]
  }

  userUpdate = signal<User | null>(null);
  userService = inject(UserService);
  identityService = inject(IdentityService)
  message = inject(NzMessageService);

  teamDrawerClosed = output();

  isEditingName = false;
  isEditingUsername = false;
  isEditingRole = false;
  isEditingRate = false;
  isEditingPhone = false;
  isEditingEmail = false;

  canEditRole = false;
  canEditSalary = false
  canEditField = false;

  constructor(){
    effect(() => {
      const u = this.user();
      if (u) {
        const currentUserId = this.identityService.getUserId();
        const currentUserRole = this.identityService.getUserRole();

        if (currentUserId === u.userId && currentUserRole !== 'Admin') {
          this.canEditRole = false;
          this.canEditSalary = false;
        } else if(currentUserId !== u.userId && currentUserRole !== 'Admin'){
          this.canEditRole = false;
          this.canEditSalary = false;
        } else if(currentUserId !== u.userId && currentUserRole === 'Admin'){
          this.canEditRole = true;
          this.canEditSalary = true;
        } else if(currentUserId === u.userId && currentUserRole === 'Admin'){
          this.canEditRole = true;
          this.canEditSalary = true;
        }

        if(currentUserId === u.userId){
          this.canEditField = true;
        } else if(currentUserRole !== u.userId && currentUserRole === 'Admin'){
          this.canEditField = true;
        } else if(currentUserId !== u.userId && currentUserRole !== 'Admin'){
          this.canEditField = false;
        }

        this.userUpdate.set({ ...u });
        if (u.userId) {
          this.userService.getAllProjectsByUserId(u.userId).subscribe({
            next: (projects: ProjectDetails[]) => {
              this.projects = projects;
              this.stages = [];
              this.processes = [];
              projects.forEach(project => {
                project.stages?.forEach(stage => {
                  this.stages.push(stage);
                  stage.processes.forEach(p => this.processes.push(p));
                });
              });
            },
            error: (err) => this.message.error('Ошибка при получении процессов: ' + err.message)
          });
        } else {
          this.resetSelections();
        }
      }
    });
  }

  resetSelections() {
    this.selectedStageId = '';
    this.selectedProjectId = '';
    this.processes = [];
    this.filteredProcessesByProjectId = [];
    this.stages = [];
    this.filteredStagesByProjectId = [];
  }

  handleClose() {
    this.teamDrawerClosed.emit();
  }

  updateUser(){
    this.userService.updateUser(this.user().userId, this.user()).subscribe({
      error: (err) => {
        this.message.error('Ошибка при обновлении данных: ', err.message)
      },
      complete: () => {
        this.message.success('Данные успешно обновлены!')
      }
    });
  }

  startEditingTeammateField(field: string) {
    if (field === 'name') {
      this.isEditingName = !this.isEditingName;
      if(!this.isEditingName){
        this.updateUser();
      }
    }
    if (field === 'username') {
      this.isEditingUsername = !this.isEditingUsername;
      if(!this.isEditingUsername){
        this.updateUser();
      }
    }
    if (field === 'role') {
      this.isEditingRole = !this.isEditingRole;
      if(!this.isEditingRole){
        this.updateUser();
      }
    }
    if (field === 'rate') {
      this.isEditingRate = !this.isEditingRate;
      if(!this.isEditingRate){
        this.updateUser();
      }
    }
    if (field === 'phone') {
      this.isEditingPhone = !this.isEditingPhone;
      if(!this.isEditingPhone){
        this.updateUser();
      }
    }
    if (field === 'email') {
      this.isEditingEmail = !this.isEditingEmail;
      if(!this.isEditingEmail){
        this.updateUser();
      }
    }
  }

  finishEditingTeammateField(field: string) {
    if (field === 'name') this.isEditingName = false;
    if (field === 'username') this.isEditingUsername = false;
    if (field === 'role') this.isEditingRole = false;
    if (field === 'rate') this.isEditingRate = false;
    if (field === 'phone') this.isEditingPhone = false;
    if (field === 'email') this.isEditingEmail = false;

    this.updateUser();
  }

  getColor(value: string): string {
  switch(value) {
    case 'Admin': return '#00C040';
    case 'GIP': return '#FFA94D';
    case 'Employee': return '#3a58dbff';
    default: return '#FFA94D';
  }
}

  protected readonly window = window;
}
