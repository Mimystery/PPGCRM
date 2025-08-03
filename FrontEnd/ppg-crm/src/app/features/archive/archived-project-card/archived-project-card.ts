import {Component, Input} from '@angular/core';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzButtonModule} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-archived-project-card',
  imports: [NzCardModule, NzBadgeModule,NzProgressModule, NzAvatarModule, NzButtonModule],
  templateUrl: './archived-project-card.html',
  styleUrl: './archived-project-card.less'
})
export class ArchivedProjectCardComponent {
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
