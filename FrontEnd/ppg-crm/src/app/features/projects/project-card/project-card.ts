import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectCardData } from '../data/interfaces/project-card-data';
import { SelectedProjectService } from '../../../core/services/selected-project/selected-project';
import {CommonModule} from '@angular/common';
import {ProjectDetailsService} from '../../project-details/data/services/project-details-service';
import {NzMessageService} from 'ng-zorro-antd/message';


@Component({
  selector: 'app-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule,
    CommonModule
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.less'
})
export class ProjectCardComponent {

  project = input.required<ProjectCardData>();

  @Output() archived = new EventEmitter<string>();

  selectedProjectService = inject(SelectedProjectService);
  projectDetailsService = inject(ProjectDetailsService)
  message = inject(NzMessageService);
  onCardClick = () =>{
    console.log(this.project())
    this.selectedProjectService.selectedProjectName.set(this.project().projectName);
    this.selectedProjectService.selectedProjectId.set(this.project().projectId);
    this.selectedProjectService.selectedProjectIsArchived.set(this.project().isArchived)

    localStorage.setItem('selectedProjectId', this.project().projectId);
    localStorage.setItem('selectedProjectName', this.project().projectName);
    localStorage.setItem('selectedProjectIsArchived', String(this.project().isArchived));
  }

  getProjectProgress(project: ProjectCardData){
      if (!project || !project.processCountByStatus) {
      return { done: 0, inProgress: 0, toDo: 0, percent: 0, successPercent: 0 };
      }

      const { ToDo = 0, InProgress = 0, Done = 0 } = project.processCountByStatus;

      const total = ToDo + InProgress + Done || 1;

      const successPercent = Math.round((Done / total) * 100);
      const percent = Math.round(((Done + InProgress) / total) * 100);
  
      return { done: Done, inProgress: InProgress, toDo: ToDo, percent, successPercent };
    }

  onArchiveClick() {
    const { processCountByStatus, ...archivedProjectBody } = this.project();
    archivedProjectBody.isArchived = true;
    this.projectDetailsService.updateProjectDetails(this.project().projectId, archivedProjectBody)
      .subscribe({
        complete: () =>{
          this.message.success("Проект архивирован!")
          this.archived.emit(this.project().projectId);
        },
        error: (error)=>{
          this.message.error("Ошибка при архивировании: " + error.message)
        }
      });
  }
}
