import { Component, ElementRef, HostListener, inject, input, ViewChild } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { StagesListComponent } from './stages-list/stages-list';
import { CommonModule } from '@angular/common';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectComponent, NzSelectModule } from "ng-zorro-antd/select";
import { SelectedProjectService } from '../../core/services/selected-project/selected-project';
import { ProjectDetails } from './data/interfaces/project.details.interface';
import { ProjectDetailsService } from './data/services/project-details-service';
import { error } from '@ant-design/icons-angular';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClientsService } from '../clients/data/services/clients-service';
import { ClientProjectCard } from '../clients/data/interfaces/client-card-in-project-details.interface';
import { ClientCardData } from '../clients/data/interfaces/client-card-data';
import {User} from '../../core/auth/data/interfaces/user.interface';
import { ProjectUserService } from './data/services/project-user-service';

@Component({
  selector: 'app-project-details',
  imports: [NzButtonModule, NzDescriptionsModule, NzDropDownModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule,
    NzCardModule, NzProgressModule, NzLayoutModule, NzTagModule, StagesListComponent, CommonModule,
    FormsModule, ReactiveFormsModule, NzDatePickerModule, NzSelectComponent, NzSelectModule],
  templateUrl: './project-details.html',
  styleUrl: './project-details.less'
})
export class ProjectDetailsComponent {
  selectedProjectService = inject(SelectedProjectService)
  projectDetailsService = inject(ProjectDetailsService)
  projectUsersSerivce = inject(ProjectUserService)
  clientsService = inject(ClientsService)
  message = inject(NzMessageService);

  project: ProjectDetails | null = null;
  clients: ClientCardData[] | null = null;

  //*** ЧЧОГО boolean | "submitting"???? БО КОЛИ ВІДПРАВЛЯТИ ДАННІ І ОЧІКУЄМО ОТВЕТ БЕКЕНДА ЩОБ БУЛА АНІМАЦІЯ КРУЖОЧКА ЯК ТІЛЬКИ ЗМІНИТЬСЯ ТО
  //* МІНЯЄМО З СУБМІТІНГ НА БУЛЛ І ВСЕ
  isEditingProjectName: boolean | "submiting" = false;
  isEditingBudget: boolean | "submiting" = false;
  isEditingExpenses: boolean | "submiting" = false;
  isEditingStartDate: boolean | "submiting" = false;
  isEditingEndDate: boolean | "submiting" = false;
  isEditingConstWorkStartDate: boolean | "submiting" = false;
  isEditingDescription: boolean | "submiting" = false;

  projectResponsibleUsers = new Array<User>();

  selectedStatus: string = 'NotStarted';

  constructor(){
    this.projectDetailsService.getAllProjectDetails(this.selectedProjectService.selectedProjectId()!)
      .subscribe({
        next: (val) => {
          this.project = val;
          for (let stage of this.project?.stages!) {
            for (let process of stage.processes){
              this.projectResponsibleUsers =  [...this.projectResponsibleUsers, ...process.responsibleUsers];
            }
          }
          console.log(typeof this.projectResponsibleUsers);
          console.log(this.project)

          this.projectUsersSerivce.setUsers(this.projectResponsibleUsers)
        },
        error: (error) => {
          console.error(error);
        }
      })

    this.clientsService.getClients().subscribe(val => this.clients = val)

    this.projectUsersSerivce.users$.subscribe(users => {
      this.projectResponsibleUsers = users;
      console.log("Updated:", users);
    })
  }

  dropdownVisible = false;
  onClientSelect(clientData: ClientCardData) {

    if (this.project) {
      this.project.clientId = clientData.clientId;
      this.project.client = clientData;
    }

    this.projectDetailsService.updateProjectDetails(
      this.selectedProjectService.selectedProjectId()!,
      this.project!
    ).subscribe({
      error: (err) => {
        this.message.error('Ошибка при обновлении данных: ' + err.message);
      },
      complete: () => {
        this.message.success('Данные успешно обновлены!');
      }
    });

    this.dropdownVisible = false;
  }

   @ViewChild('budgetInput') budgetInput!: ElementRef<HTMLInputElement>;
   @ViewChild('expensesInput') expensesInput!: ElementRef<HTMLInputElement>;
   @ViewChild('descriptionInput') descriptionInput!: ElementRef<HTMLInputElement>;

  startEditingDetailsField(field: string) {
  if (field === 'budget') {
      this.isEditingBudget = !this.isEditingBudget;

      setTimeout(() => {
        this.budgetInput.nativeElement.focus();
      });
    }
    if (field === 'expenses') {
      this.isEditingExpenses = !this.isEditingExpenses;

      setTimeout(() => {
        this.expensesInput.nativeElement.focus();
      });
    }
    if (field === 'projectName') {
      this.isEditingProjectName = !this.isEditingProjectName;
    }
    if (field === 'startDate') {
      this.isEditingStartDate = !this.isEditingStartDate;
    }
    if (field === 'endDate') {
      this.isEditingEndDate = !this.isEditingEndDate;
    }
    if (field === 'constWorkStartDate') {
      this.isEditingConstWorkStartDate = !this.isEditingConstWorkStartDate;
    }
    if (field == 'description'){
      this.isEditingDescription = !this.isEditingDescription;

      setTimeout(() => {
        this.descriptionInput.nativeElement.focus();
      });
    }
  }

  @HostListener('document:keydown', ['$event'])
    handleEnterKey(event: KeyboardEvent) {
      if (event.shiftKey) return;

      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingBudget) {
        this.finishEditingDetailsField('budget');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingExpenses) {
        this.finishEditingDetailsField('expenses');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingStartDate) {
        this.finishEditingDetailsField('startDate');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingEndDate) {
        this.finishEditingDetailsField('endDate');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingConstWorkStartDate) {
        this.finishEditingDetailsField('constWorkStartDate');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingDescription) {
        this.finishEditingDetailsField('description');
        event.preventDefault();
      }
      if ((event.key === 'Enter' || event.key === 'Escape') && this.isEditingProjectName) {
        this.finishEditingDetailsField('projectName');
        event.preventDefault();
      }
  }

  finishEditingDetailsField(field: string) {
    if (field === 'budget') {
      this.isEditingBudget = false;
      console.log('Новое значение:', this.project?.budget);
    }
    if (field === 'expenses') {
      this.isEditingExpenses = false;
      console.log('Новое значение:', this.project?.expenses);
    }
    if (field === 'projectName') {
      this.isEditingProjectName = false;
      console.log('Новое значение:', this.project?.projectName);
    }
    if (field === 'startDate') {
      this.isEditingStartDate = false;
    }
    if (field === 'endDate') {
      this.isEditingEndDate = false;
    }
    if (field === 'constWorkStartDate') {
      this.isEditingConstWorkStartDate = false;
    }
    if (field == 'description'){
      this.isEditingDescription = false;
    }
    this.projectDetailsService.updateProjectDetails(this.selectedProjectService.selectedProjectId()!, this.project!)
      .subscribe({
        error: (err) => {
          this.message.error('Ошибка при обновлении данных: ', err.message)
        },
        complete: () => {
          this.message.success('Данные успешно обновлены!')
        }
      });
  }

  getColor(value: string): string {
  switch(value) {
    case 'NotStarted': return '#9E9E9E';
    case 'InProgress': return '#2679ff';
    case 'Paused': return '#FF9800';
    case 'Done': return '#00C040';
    case 'Expired': return '#F44336';
    case 'Cancelled': return '#fadd05';
    default: return '#000';
  }
}

  //protected readonly ProjectDetails = ProjectDetails;
}
