import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { ProjectOverviewComponent } from './overview/project-overview/project-overview.component';
import { ProjectInfoComponent } from './info/project-info/project-info.component';
import { MyTasksComponent } from './overview/my-tasks/my-tasks.component';
import { DevsListComponent } from './overview/devs-list/devs-list.component';
import { TaskInfoComponent } from './info/task-info/task-info.component';
import { ManagerRequiredGuard } from '../shared/guards/manager required/manager-required.guard';
import { DeveloperRequiredGuard } from '../shared/guards/developer required/developer-required.guard';
import { AuthGuard } from '../shared/guards';

const routes: Routes = [{
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [{
            path: '',
            redirectTo: 'projects/new',
            pathMatch: 'full',
        }, {
            path: 'projects/:projectId',
            component: ProjectOverviewComponent,
            pathMatch: 'full'
        }, {
            path: 'projects/:projectId/info',
            component: ProjectInfoComponent,
            pathMatch: 'full'
        }, {
            path: 'projects/new',
            component: ProjectInfoComponent,
            canActivate: [ManagerRequiredGuard],
            pathMatch: 'full'
        }, {
            path: 'my-tasks',
            component: MyTasksComponent,
            canActivate: [DeveloperRequiredGuard],
            pathMatch: 'full'
        }, {
            path: 'developers',
            component: DevsListComponent,
            pathMatch: 'full'
        }, {
            path: 'projects/:projectId/task/:taskId',
            component: TaskInfoComponent,
            pathMatch: 'full'
        }, {
            path: 'projects/:projectId/task/new',
            component: TaskInfoComponent,
            canActivate: [ManagerRequiredGuard],
            pathMatch: 'full'
        }]
    },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}