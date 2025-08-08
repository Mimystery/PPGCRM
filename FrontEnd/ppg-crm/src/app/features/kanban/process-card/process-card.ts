import { Component } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-process-card',
  imports: [NzButtonModule, NzIconModule],
  templateUrl: './process-card.html',
  styleUrl: './process-card.less'
})
export class ProcessCard {

}
