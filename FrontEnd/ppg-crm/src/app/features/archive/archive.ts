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
import {ArchivedProjectsService} from './data/services/archived-projects-service';
import {ProjectCardData} from '../projects/data/interfaces/project-card-data';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-archive',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, ArchivedProjectCardComponent, NzEmptyComponent,],
  templateUrl: './archive.html',
  styleUrl: './archive.less'
})
export class ArchiveComponent {
  projects: ProjectCardData[] = [];

    selectedProjectService = inject(SelectedProjectService);
    archivedProjectsService = inject(ArchivedProjectsService);
    constructor(){
      this.archivedProjectsService.getArchivedProjects()
        .subscribe(val => {
          this.projects = val
        })
    }
}
