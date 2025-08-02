import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
@Component({
  selector: 'app-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule],
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

  get total(): number {
    return this.done + this.inProgress + this.toDo;
  }

  get progressPercent(): number {
    return this.total === 0 ? 0 : ((this.done + this.inProgress) / this.total) * 100;
  }
}
