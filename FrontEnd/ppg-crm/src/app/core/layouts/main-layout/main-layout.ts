import { Component, inject, signal } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserDrawerComponent } from './user-drawer/user-drawer';
import { SelectedProjectService } from '../../services/selected-project/selected-project';

@Component({
  selector: 'app-main-layout',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzButtonModule, UserDrawerComponent, RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {

  public userDrawerVisible = signal(false);
  openDrawer = () => this.userDrawerVisible.set(true);
  closeDrawer = () => {
    this.userDrawerVisible.set(false);
  };
  projectDetails = 'projectDetails';

  selectedProjectService = inject(SelectedProjectService);
}

