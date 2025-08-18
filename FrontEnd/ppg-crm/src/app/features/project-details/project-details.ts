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

  isEditingProjectName = false;
  isEditingBudget = false;
  isEditingExpenses = false;
  isEditingStartDate: boolean = false;
  isEditingEndDate: boolean = false;
  isEditingConstWorkStartDate: boolean = false;


  projectName = 'Project name';
  budget = '21.000';
  expenses = '21.000';
  startDate = new Date(2023,10,1);
  endDate = new Date(2023,10,1);
  constWorkStartDate = new Date(2023,10,1);

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
  }

  finishEditing(field: string) {
    if (field === 'budget') {
      this.isEditingBudget = false;
      console.log('Новое значение:', this.budget);
    }
    if (field === 'expenses') {
      this.isEditingExpenses = false;
      console.log('Новое значение:', this.expenses);
    }
    if (field === 'projectName') {
      this.isEditingProjectName = false;
      console.log('Новое значение:', this.projectName);
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

}
