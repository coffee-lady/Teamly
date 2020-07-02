import { Component, OnInit } from '@angular/core';
import { User, Project } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { forkJoin, fromEvent, of } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { ProjectService } from 'src/app/shared/services';

@Component({
    selector: 'app-devs-list',
    templateUrl: './devs-list.component.html',
    styleUrls: ['./devs-list.component.less']
})
export class DevsListComponent implements OnInit {
    user: User;
    devs: User[];
    projects: Project[];
    editProjects: Project[];

    constructor(private authService: AuthService,
                private userService: UsersService,
                private projectService: ProjectService) {}

    ngOnInit(): void {
        const userData = this.authService.me();
        const devsData = this.userService.getDevelopersList();
        const projectsData = this.projectService.getProjects();

        forkJoin([userData, devsData, projectsData]).subscribe((result: any) => {
            this.user = result[0];
            this.devs = result[1];
            this.projects = result[2];
            this.editProjects = result[2];
        });

        for (const input of document.querySelectorAll('.searchEditInput')) {
            fromEvent(input, 'input')
                .pipe(
                    debounceTime(600),
                    map(event => (event.target as HTMLInputElement).value),
                    filter(value => value.length > 2 || value.length === 0),
                    distinctUntilChanged(),
                    switchMap(searchStr => {
                        return this.projectService.findProject(searchStr).pipe(catchError(err => of ([])));
                    }))
                .subscribe((projects: Project[]) => {
                    this.editProjects = projects;
                });
        }

        for (const input of document.querySelectorAll('.searchEditInput')) {
            input.addEventListener('focusout', () => {
                this.editProjects = this.projects;
            });
        }
    }

    scrollToUser(event: any) {
        const id = event.data.devId;
        const devTr = document.querySelector(`tr[[id]="${id}"]`);
        const yCoord = devTr.getBoundingClientRect().top + pageYOffset;
        document.documentElement.scrollTo(0, yCoord);
    }

    assignDevToProject(devId: string, projectId: string) {
        const devData = this.devs.find(dev => dev._id === devId);
        devData.projects.push(projectId);
        const projData = this.projects.find(proj => proj._id === projectId);
        projData.developers.push(devId);
        projData.developersData.push(devData);
        devData.projectsData.push(projData);

        const updateDev = this.userService.updateDeveloper(devData);
        const updateProj = this.projectService.createOrUpdateProject(projData);
        forkJoin([updateDev, updateProj]).subscribe();
    }

    removeDevFromProject(devId: string, projectId: string) {
        const devData = this.devs.find(dev => dev._id === devId);
        devData.projects.splice(devData.projects.indexOf(devId), 1);
        const projData = this.projects.find(proj => proj._id === projectId);
        projData.developers.splice(projData.developers.indexOf(devId), 1);
        projData.developersData.splice(projData.developersData.indexOf(devData), 1);
        devData.projectsData.splice(devData.projectsData.indexOf(projData), 1);

        const updateDev = this.userService.updateDeveloper(devData);
        const updateProj = this.projectService.createOrUpdateProject(projData);
        forkJoin([updateDev, updateProj]).subscribe();
    }

    deleteDev(devId: string) {
        this.userService
            .deleteDeveloper(devId)
            .subscribe(() => {
                this.devs.splice(this.devs.indexOf(this.devs.find(dev => dev._id === devId)), 1);
            });
    }

    isProjOfDev(dev: User, projectId: string) {
        return dev.projectsData.find(devProj => devProj._id === projectId);
    }
}