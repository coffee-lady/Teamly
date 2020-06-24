import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { DevsListComponent } from './overview/devs-list/devs-list.component';
import { MyTasksComponent } from './overview/my-tasks/my-tasks.component';
import { ProjectComponent } from './overview/project/project.component';
import { InfoComponent } from './info/info.component';
import { ProjectInfoComponent } from './info/project-info/project-info.component';
import { TaskInfoComponent } from './info/task-info/task-info.component';
import { MainComponent } from './main.component';
import { NewTaskComponent } from './info/new-task/new-task.component';


const routes: Routes = [{
    path: '',
    component: MainComponent,
    children: [{
            path: '/overview',
            component: OverviewComponent,
            children: [
                { path: '/developers', component: DevsListComponent, pathMatch: 'full' },
                { path: '/my-tasks', component: MyTasksComponent, pathMatch: 'full' },
                { path: '/projects/:projectId', component: ProjectComponent, pathMatch: 'full' }
            ]
        },
        {
            path: '/projects/:projectId/info',
            component: InfoComponent,
            children: [
                { path: '', component: ProjectInfoComponent, pathMatch: 'full' },
                { path: '/tasks/:taskId', component: TaskInfoComponent, pathMatch: 'full' },
                { path: '/tasks/new', component: NewTaskComponent, pathMatch: 'full' }
            ]
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}