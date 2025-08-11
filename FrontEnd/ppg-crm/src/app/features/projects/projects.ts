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
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, ProjectCardComponent, NzModalModule, CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {

  isVisible = false;
  isOkDisabled = true;
  newProjectName = '';

  projects: ProjectCardData[] = [];

  projectsService = inject(ProjectsService)

  constructor(){
    this.projectsService.getProjects()
      .subscribe(val => {
        this.projects = val
      })
  }

  checkIsInputEmpty(){
    this.isOkDisabled = this.newProjectName.trim() === '';
  }

  showCreateProjectModal(): void {
    this.isVisible = true;
  }

  handleCreateProjectModalOk(): void {
    this.isVisible = false;

    this.projectsService.createProject(this.newProjectName).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log('Ошибка:', err);
      }
    });

    this.newProjectName = '';
    this.checkIsInputEmpty();
  }

  handleCreateProjectModalCancel(): void {
    this.isVisible = false;

    this.newProjectName = '';
    this.checkIsInputEmpty()
  }

  getTotalTasks(p: any) {
    return p.progress.done + p.progress.inProgress + p.progress.todo;
  }

  getPercent(p: any) {
    const total = this.getTotalTasks(p);
    return {
      done: Math.round((p.progress.done / total) * 100),
      inProgress: Math.round((p.progress.inProgress / total) * 100),
      todo: Math.round((p.progress.todo / total) * 100)
    };
  }
}
