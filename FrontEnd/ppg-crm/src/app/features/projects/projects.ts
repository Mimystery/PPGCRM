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
import { ArchivedProjectsService } from '../archive/data/services/archived-projects-service';

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
  searchQuery = '';

  projects: ProjectCardData[] = [];
  archivedProjects: ProjectCardData[] = [];

  projectsService = inject(ProjectsService)
  archivedProjectsService = inject(ArchivedProjectsService)

  constructor() {
    this.projectsService.getProjects()
      .subscribe(val => {
        this.projects = val
      })
    
    this.archivedProjectsService.getArchivedProjects()
      .subscribe(val => {
        this.archivedProjects = val
      })
  }

  get filteredProjects(): ProjectCardData[] {
    if (!this.searchQuery.trim()) {
      return this.projects;
    }
    return this.projects.filter(p =>
      p.projectName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  onProjectArchived(projectId: string) {
    const archivedProject = this.projects.find(p => p.projectId === projectId);
    if (!archivedProject) return;

    this.projects = this.projects.filter(p => p.projectId !== projectId);

    this.archivedProjects.push(archivedProject);
  }

  getActiveProjectsCount(): number {
    if (!this.projects) return 0;

    return this.projects.length;
  }

  getArchivedProjectsCount(): number {
    if (!this.projects) return 0;

    return this.archivedProjects.length;
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
