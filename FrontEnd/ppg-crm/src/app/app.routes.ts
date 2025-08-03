import { Routes } from '@angular/router';
import  { LoginComponent } from './core/auth/pages/login/login';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout';
import { ProjectsComponent } from './features/projects/projects';
import { ArchiveComponent } from './features/archive/archive'

export const routes: Routes = [
  {
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: ProjectsComponent },
    { path: 'archive', component: ArchiveComponent },
  ],
},
  {
  path:'login',
  component: LoginComponent,
},];
