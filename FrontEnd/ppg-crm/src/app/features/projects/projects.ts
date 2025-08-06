import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FormsModule } from '@angular/forms';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ProjectCardComponent } from './project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [NzButtonModule, NzDescriptionsModule, NzPageHeaderModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, ProjectCardComponent],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {
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
    },
    // Add more projects here
  ];

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
