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
    styleUrls: ['./devs-list.component.less', '../../../shared/styles/table.less']
})
export class DevsListComponent implements OnInit {
    user: User;
    devs: User[] = [];
    projects: Project[] = [];
    editProjects: Project[] = [];

    constructor(private authService: AuthService,
        private userService: UsersService,
        private projectService: ProjectService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
        const devsData = this.userService.getDevelopersList();
        const projectsData = this.projectService.getProjects();

        forkJoin([devsData, projectsData]).subscribe((result: any) => {
            this.devs = result[0];
            this.projects = this.editProjects = result[1];
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

    formatProjectsTitles(projects: Project[]): string {
        const projectsTitles: string[] = [];
        for (const project of projects) {
            projectsTitles.push(project.title);
        }
        return projectsTitles.join(', ');
    }

    scrollToUser(id: string) {
        const table: HTMLElement = document.querySelector('.table');
        const devTr: HTMLElement = document.querySelector(`tr[id="${id}"]`);
        table.scrollTop = devTr.offsetTop;
    }

    assignDevToProject(devId: string, projectId: string) {
        const devData = this.devs.find(dev => dev._id === devId);
        devData.projects.push(projectId);
        const projData = this.projects.find(proj => proj._id === projectId);
        projData.developers.push(devId);
        projData.developersData.push(devData);
        devData.projectsData.push(projData);

        const updateDev = this.userService.updateDeveloper(devData);
        const updateProj = this.projectService.updateProject(projData, projData._id);
        forkJoin([updateDev, updateProj]).subscribe();
    }

    editDev(dev: User) {
        const div = document.createElement('div');
        div.innerHTML = `<input value="${dev.fullname}">`;
        const editButtonContainer = document.querySelector(`[id="${dev._id}"] .manager-buttons div:nth-child(2)`);
        editButtonContainer.after(div);
        editButtonContainer.remove();
    }

    saveDev(dev: User) {
        const inputContainer = document.querySelector(`[id="${dev._id}"] .manager-buttons div:nth-child(2)`);
        const textarea = inputContainer.firstChild as HTMLInputElement;
        const devData = this.devs.find(developer => developer._id === dev._id);
        devData.fullname = textarea.value;
        this.userService
            .updateDeveloper(devData)
            .subscribe();
        const div = document.createElement('div');
        div.innerHTML = `<button id="editDevButton" type="sumbit" (click)="editDev(dev)">
        <img src="../../../../assets/icons/edit_little.png">
    </button>`;
        inputContainer.after(div);
        inputContainer.remove();
    }

    removeDevFromProject(devId: string, projectId: string) {
        console.log(devId, projectId);
        const devData = this.devs.find(dev => dev._id === devId);
        devData.projects.splice(devData.projects.indexOf(devId), 1);
        const projData = this.projects.find(proj => proj._id === projectId);
        projData.developers.splice(projData.developers.indexOf(devId), 1);
        projData.developersData.splice(projData.developersData.indexOf(devData), 1);
        devData.projectsData.splice(devData.projectsData.indexOf(projData), 1);

        const updateDev = this.userService.updateDeveloper(devData);
        const updateProj = this.projectService.updateProject(projData, projData._id);
        forkJoin([updateDev, updateProj]).subscribe();
    }

    deleteDev(devId: string) {
        this.userService
            .deleteDeveloper(devId)
            .subscribe(() => {
                this.devs.splice(this.devs.indexOf(this.devs.find(dev => dev._id === devId)), 1);
            });
    }
}