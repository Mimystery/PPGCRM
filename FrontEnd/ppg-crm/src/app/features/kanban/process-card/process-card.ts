import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzFlexModule} from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-process-card',
  imports: [NzButtonModule, NzIconModule, NzCardModule, NzFlexModule],
  templateUrl: './process-card.html',
  styleUrl: './process-card.less'
})
export class ProcessCard {

}
