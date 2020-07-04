import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectsSearchComponent } from './overview/projects-search/projects-search.component';
import { DevelopersSearchComponent } from './overview/developers-search/developers-search.component';
import { DevsListComponent } from './overview/devs-list/devs-list.component';
import { MyTasksComponent } from './overview/my-tasks/my-tasks.component';
import { TaskInfoComponent } from './info/task-info/task-info.component';
import { ProjectInfoComponent } from './info/project-info/project-info.component';
import { ProjectOverviewComponent } from './overview/project-overview/project-overview.component';
import { MainRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NewProjectComponent } from './new/new-project/new-project.component';
import { NewTaskComponent } from './new/new-task/new-task.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AssignInputComponent } from './assign-input/assign-input.component';
import { ProjectLeftPanelComponent } from './project-left-panel/project-left-panel.component';

@NgModule({
    declarations: [
        MainComponent,
        NavbarComponent,
        ProjectsSearchComponent,
        DevelopersSearchComponent,
        DevsListComponent,
        MyTasksComponent,
        UsersListComponent,
        AssignInputComponent,
        TaskInfoComponent,
        ProjectInfoComponent,
        ProjectOverviewComponent,
        ProjectLeftPanelComponent,
        NewProjectComponent,
        NewTaskComponent,
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownMenuModule,
        TooltipModule,
        HttpClientModule,
    ]
})
export class MainModule {}