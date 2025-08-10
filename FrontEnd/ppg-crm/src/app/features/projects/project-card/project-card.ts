import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProjectMainCard } from '../data/interfaces/projectMainCard.interface';
@Component({
  selector: 'app-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule],
  templateUrl: './project-card.html',
  styleUrl: './project-card.less'
})
export class ProjectCardComponent {
  @Input() title = 'Project Name';
  @Input() description = 'Description';
  @Input() startDate = '23.07.2025';
  @Input() endDate = '15.08.2025';
  @Input() done = 2;
  @Input() inProgress = 5;
  @Input() toDo = 4;
  @Input() project!: ProjectMainCard;

  get total(): number {
    return this.done + this.inProgress + this.toDo;
  }

  get progressPercent(): number {
    return this.total === 0 ? 0 : ((this.done + this.inProgress) / this.total) * 100;
  }
}
