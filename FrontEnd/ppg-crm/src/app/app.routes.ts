import { Routes } from '@angular/router';
import  { LoginComponent } from './core/auth/pages/login/login';
import { MainLayoutComponent } from './core/layouts/MainLayout/main-layout';
import { ProjectsComponent } from './features/projects/projects';

export const routes: Routes = [
  {
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: ProjectsComponent },
  ],
},
  {
  path:'login',
  component: LoginComponent,
},];
