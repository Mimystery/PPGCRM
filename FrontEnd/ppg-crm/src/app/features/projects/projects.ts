import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ProjectCardComponent } from './project-card/project-card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ProjectsService } from './data/services/projects-service';
import { ProjectCardData } from './data/interfaces/project-card-data';

@Component({
  selector: 'app-projects',
  imports: [
    NzButtonModule,
    NzDescriptionsModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    ProjectCardComponent,
    NzModalModule,
    CommonModule
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  createNewProjectModalVisible = false;
  createNewProjectModalOkDisabled = true;
  createNewProjectName = '';

  projects: ProjectCardData[] = [];

  projectsService = inject(ProjectsService)

  constructor() {
    this.projectsService.getProjects()
      .subscribe(val => {
        this.projects = val
      })
  }

  checkIfNewProjectNameEmpty() {
    this.createNewProjectModalOkDisabled = this.createNewProjectName.trim() === '';
  }

  openCreateNewProjectModal(): void {
    this.createNewProjectModalVisible = true;
  }

  handleCreateNewProjectModalOk(): void {
    this.createNewProjectModalVisible = false;

    this.projectsService.createProject(this.createNewProjectName).subscribe({
      next: () => {
        this.projectsService.getProjects()
          .subscribe(val => {
            this.projects = val
          })
      },
      error: (err) => {
        console.log('Ошибка:', err);
      }
    });

    this.createNewProjectName = '';
    this.checkIfNewProjectNameEmpty();
  }

  handleCreateNewProjectModalCancel(): void {
    this.createNewProjectModalVisible = false;

    this.createNewProjectName = '';
    this.checkIfNewProjectNameEmpty();
  }
}
