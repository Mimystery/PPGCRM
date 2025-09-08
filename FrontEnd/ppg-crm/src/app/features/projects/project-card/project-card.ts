import {Component, inject, input} from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectCardData } from '../data/interfaces/project-card-data';
import { SelectedProjectService } from '../../../core/services/selected-project/selected-project';
import {CommonModule} from '@angular/common';


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

  selectedProjectService = inject(SelectedProjectService);
  onCardClick = () =>{
    this.selectedProjectService.selectedProjectName.set(this.project().projectName);
    this.selectedProjectService.selectedProjectId.set(this.project().projectId);

    localStorage.setItem('selectedProjectId', this.project().projectId);
    localStorage.setItem('selectedProjectName', this.project().projectName);
  }

  onArchiveClick() {
  console.log('Archive clicked!');
}
}
