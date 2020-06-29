import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { ProjectsSearchComponent } from './main/overview/projects-search/projects-search.component';
import { DevelopersSearchComponent } from './main/overview/developers-search/developers-search.component';
import { DevsListComponent } from './main/overview/devs-list/devs-list.component';
import { MyTasksComponent } from './main/overview/my-tasks/my-tasks.component';
import { AssignInputComponent } from './main/info/assign-input/assign-input.component';
import { TaskInfoComponent } from './main/info/task-info/task-info.component';
import { ProjectInfoComponent } from './main/info/project-info/project-info.component';
import { TaskLeftPanelComponent } from './main/info/task-info/task-left-panel/task-left-panel.component';
import { LoginComponent } from './auth/login/login.component';
import { UsersListComponent } from './main/info/project-info/users-list/users-list.component';
import { ProjectOverviewComponent } from './main/overview/project-overview/project-overview.component';
import { ProjectLeftPanelComponent } from './main/info/project-info/project-left-panel/project-left-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
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
        TaskLeftPanelComponent,
        DropdownMenuComponent,
        ProjectOverviewComponent,
        ProjectLeftPanelComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        MainModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {}