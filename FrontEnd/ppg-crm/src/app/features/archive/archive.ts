import { Component, inject } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import { ArchivedProjectCardComponent } from './archived-project-card/archived-project-card';
import { SelectedProjectService } from '../../core/services/selected-project/selected-project';

@Component({
  selector: 'app-archive',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, ArchivedProjectCardComponent,],
  templateUrl: './archive.html',
  styleUrl: './archive.less'
})
export class ArchiveComponent {
  projects = [
    {
      title: 'Project Name',
      description: 'Description',
      startDate: '23.07.2025',
      endDate: '15.08.2025',
      progress: {
        done: 2,
        inProgress: 5,
        todo: 4,
      }
    },]

    selectedProjectService = inject(SelectedProjectService);

    constructor(){
      //console.log(this.selectedProjectService.selectedProjectId())
    }
}
