import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { UsersListComponent } from './info/users-list/users-list.component';
import { AssignInputComponent } from './info/assign-input/assign-input.component';
import { TaskInfoComponent } from './info/task-info/task-info.component';
import { ProjectInfoComponent } from './info/project-info/project-info.component';
import { NewTaskComponent } from './info/new-task/new-task.component';


@NgModule({
  declarations: [UsersListComponent, AssignInputComponent, TaskInfoComponent, ProjectInfoComponent, NewTaskComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
