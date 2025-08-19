import { Component, inject, input } from '@angular/core';
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

  project: ProjectDetails | null = null;

  //*** ЧЧОГО boolean | "submitting"???? БО КОЛИ ВІДПРАВЛЯТИ ДАННІ І ОЧІКУЄМО ОТВЕТ БЕКЕНДА ЩОБ БУЛА АНІМАЦІЯ КРУЖОЧКА ЯК ТІЛЬКИ ЗМІНИТЬСЯ ТО
  //* МІНЯЄМО З СУБМІТІНГ НА БУЛЛ І ВСЕ
  isEditingProjectName: boolean | "submiting" = false;
  isEditingBudget: boolean | "submiting" = false;
  isEditingExpenses: boolean | "submiting" = false;
  isEditingStartDate: boolean | "submiting" = false;
  isEditingEndDate: boolean | "submiting" = false;
  isEditingConstWorkStartDate: boolean | "submiting" = false;
  isEditingDescription: boolean | "submiting" = false;


  selectedStatus: string = 'NotStarted';

  constructor(){
    console.log(this.selectedProjectService.selectedProjectId())
    this.projectDetailsService.getAllProjectDetails(this.selectedProjectService.selectedProjectId()!)
      .subscribe({
        next: (val) => {
          this.project = val;
          console.log("Test;", this.project)
        },
        error: (error) => {
          console.error(error);
        }
      })
  }

  onChange(result: Date): void {
    console.log('onChange: ', result.toLocaleDateString('ru-RU'));
  }

  startEditing(field: string) {
  if (field === 'budget') {
      this.isEditingBudget = true;
    }
    if (field === 'expenses') {
      this.isEditingExpenses = true;
    }
    if (field === 'projectName') {
      this.isEditingProjectName = true;
    }
    if (field === 'startDate') {
      this.isEditingStartDate = true;
    }
    if (field === 'endDate') {
      this.isEditingEndDate = true;
    }
    if (field === 'constWorkStartDate') {
      this.isEditingConstWorkStartDate = true;
    }
    if (field == 'description'){
      this.isEditingDescription = true;
    }
  }

  finishEditing(field: string) {
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
          alert("Ошибка при обновлении данных: " + err.message);
        },
        complete: () => {
          alert("Данные успешно обновлены!");
        }
      });
  }

  loadClientbyId(clientId: string) {

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
