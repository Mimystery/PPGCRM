import {Component, EventEmitter, inject, input, Input, Output} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ProjectCardData} from '../../projects/data/interfaces/project-card-data';
import {SelectedProjectService} from '../../../core/services/selected-project/selected-project';
import {CommonModule} from '@angular/common';
import {ProjectDetailsService} from '../../project-details/data/services/project-details-service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-archived-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule,
  CommonModule],
  templateUrl: './archived-project-card.html',
  styleUrl: './archived-project-card.less'
})
export class ArchivedProjectCardComponent {
  project = input.required<ProjectCardData>();

  @Output() restored = new EventEmitter<string>();

  selectedProjectService = inject(SelectedProjectService);
  projectDetailsService = inject(ProjectDetailsService)
  message = inject(NzMessageService);
  onCardClick = () =>{
    this.selectedProjectService.selectedProjectName.set(this.project().projectName);
    this.selectedProjectService.selectedProjectId.set(this.project().projectId);

    localStorage.setItem('selectedProjectId', this.project().projectId);
    localStorage.setItem('selectedProjectName', this.project().projectName);
  }

  onRestoreClick() {
    const { processCountByStatus, ...restoredProjectBody } = this.project();
    restoredProjectBody.isArchived = false;
    this.projectDetailsService.updateProjectDetails(this.project().projectId, restoredProjectBody)
      .subscribe({
        complete: () =>{
          this.message.success("Проект восстановлен!")
          this.restored.emit(this.project().projectId)
        },
        error: (error)=>{
          this.message.error("Ошибка при восстановлении: " + error.message)
        }
      });
  }
}
