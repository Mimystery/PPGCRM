import { Routes } from '@angular/router';
import  { LoginComponent } from './core/auth/pages/login/login';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout';
import { ProjectsComponent } from './features/projects/projects';
import { ArchiveComponent } from './features/archive/archive'
import { ProjectDetailsComponent } from './features/project-details/project-details';
import { KanbanComponent } from './features/kanban/kanban';
import { CalendarComponent } from './features/calendar/calendar';
import { FileComponent } from './features/file/file';
import { ClientsComponent } from './features/clients/clients';
import { AnalyticsComponent } from './features/analytics/analytics';
import { TeamComponent } from './features/team/team';
import { RegistrationComponent } from './core/auth/pages/registration/registration';

export const routes: Routes = [
  {
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: '', component: ProjectsComponent },
    { path: 'project-details', component: ProjectDetailsComponent },
    { path: 'kanban', component: KanbanComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'file', component: FileComponent },
    { path: 'archive', component: ArchiveComponent },
    { path: 'clients', component: ClientsComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'team', component: TeamComponent },
  ],
},
  {
  path:'login',
  component: LoginComponent,
},
  {
    path: 'registration',
    component: RegistrationComponent,
  },
];
