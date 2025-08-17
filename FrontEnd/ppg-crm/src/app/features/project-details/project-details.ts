import { Component } from '@angular/core';
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
  isEditingProjectName = false;
  isEditingBudget = false;
  isEditingExpenses = false;


  projectName = 'Project name';
  budget = '21.000';
  expenses = '21.000';
  startDate = null;
  endDate = null;
  constWorkStartDate = null;

  selectedStatus: string | null = 'notStarted';

  onChange(result: Date): void {
    console.log('onChange: ', result);
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
  }

  getColor(value: string): string {
  switch(value) {
    case 'notStarted': return '#9E9E9E';
    case 'inProgress': return '#2679ff';
    case 'paused': return '#FF9800';
    case 'done': return '#00C040';
    case 'expired': return '#F44336';
    case 'cancelled': return '#fadd05';
    default: return '#000';
  }
}

}
