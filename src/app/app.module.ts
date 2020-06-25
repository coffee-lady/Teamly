import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ProjectsSearchComponent } from './main/overview/projects-search/projects-search.component';
import { DevelopersSearchComponent } from './main/overview/developers-search/developers-search.component';
import { InfoComponent } from './main/info/info.component';
import { DevsListComponent } from './main/overview/devs-list/devs-list.component';
import { MyTasksComponent } from './main/overview/my-tasks/my-tasks.component';
import { OverviewComponent } from './main/overview/overview.component';
import { ProjectComponent } from './main/overview/project/project.component';

import { AuthModule } from './auth/auth.module';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        MainComponent,
        NavbarComponent,
        ProjectsSearchComponent,
        DevelopersSearchComponent,
        InfoComponent,
        DevsListComponent,
        MyTasksComponent,
        OverviewComponent,
        ProjectComponent,
    ],
    imports: [
        BrowserModule,
        // AuthModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
