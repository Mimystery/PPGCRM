import { Component } from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzDescriptionsModule} from 'ng-zorro-antd/descriptions';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzProgressModule} from 'ng-zorro-antd/progress';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import {NzTagModule} from 'ng-zorro-antd/tag';
import { StagesListComponent } from './stages-list/stages-list';

@Component({
  selector: 'app-project-details',
  imports: [NzButtonModule, NzDescriptionsModule, NzDropDownModule,
    NzSpaceModule, NzIconModule, NzInputModule, FormsModule, NzModalModule,
    NzCardModule, NzProgressModule, NzLayoutModule, NzTagModule, StagesListComponent,],
  templateUrl: './project-details.html',
  styleUrl: './project-details.less'
})
export class ProjectDetailsComponent {

}
