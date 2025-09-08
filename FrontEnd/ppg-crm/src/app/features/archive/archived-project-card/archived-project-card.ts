import {Component, inject, input, Input} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {ProjectCardData} from '../../projects/data/interfaces/project-card-data';
import {SelectedProjectService} from '../../../core/services/selected-project/selected-project';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-archived-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule,
  CommonModule],
  templateUrl: './archived-project-card.html',
  styleUrl: './archived-project-card.less'
})
export class ArchivedProjectCardComponent {
  project = input.required<ProjectCardData>();

  selectedProjectService = inject(SelectedProjectService);
  onCardClick = () =>{
    this.selectedProjectService.selectedProjectName.set(this.project().projectName);
    this.selectedProjectService.selectedProjectId.set(this.project().projectId);

    localStorage.setItem('selectedProjectId', this.project().projectId);
    localStorage.setItem('selectedProjectName', this.project().projectName);
  }

  onRestoreClick() {
    console.log('Restore clicked!');
  }
}
