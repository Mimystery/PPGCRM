import { Component, inject, signal } from '@angular/core';
import {RouterModule, RouterOutlet} from "@angular/router";

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserDrawerComponent } from './user-drawer/user-drawer';
import { SelectedProjectService } from '../../services/selected-project/selected-project';
import { UserService } from '../../auth/data/services/user-service';
import { User } from '../../auth/data/interfaces/user.interface';
import { IdentityService } from '../../auth/data/services/identity-service';

@Component({
  selector: 'app-main-layout',
  imports: [NzBreadCrumbModule, NzIconModule, NzMenuModule, NzLayoutModule, NzButtonModule, UserDrawerComponent, RouterOutlet, RouterModule],
  standalone: true,
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayoutComponent {
selectedProjectService = inject(SelectedProjectService);
userService = inject(UserService)
identityService = inject(IdentityService)

userProfile: User | undefined;

  ngOnInit(){
    this.userService.getUserDetails().subscribe( val => {
      this.userProfile = val
    })
  }

  projectId = localStorage.getItem('selectedProjectId');
  projectName = localStorage.getItem('selectedProjectName');

  constructor() {
    this.selectedProjectService.selectedProjectId.set(this.projectId)
    this.selectedProjectService.selectedProjectName.set(this.projectName)
  }

  logout(){
    this.identityService.logout()
  }

  public userDrawerVisible = signal(false);
  openDrawer = () => this.userDrawerVisible.set(true);
  closeDrawer = () => {
    this.userDrawerVisible.set(false);
  };
  projectDetails = 'projectDetails';

  projectsLinkOnClick(e: MouseEvent) {
  e.stopPropagation();
  }
}

