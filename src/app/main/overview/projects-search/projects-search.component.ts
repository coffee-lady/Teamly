import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/shared/services';
import { Project } from 'src/app/shared/interfaces';
import { fromEvent, of } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-projects-search',
    templateUrl: './projects-search.component.html',
    styleUrls: ['./projects-search.component.less']
})
export class ProjectsSearchComponent implements OnInit {
    @Output() goToProject: EventEmitter < string > = new EventEmitter();
    projects: Project[];

    constructor(private projectService: ProjectService) {}

    ngOnInit(): void {
        fromEvent(document.getElementById('searchInput'), 'input')
            .pipe(
                debounceTime(600),
                map(event => (event.target as HTMLInputElement).value),
                filter(value => value.length > 2),
                distinctUntilChanged(),
                switchMap(searchStr => {
                    return this.projectService
                    .findProject(searchStr)
                    .pipe(catchError(err => of ([])));
                }))
            .subscribe((projects: Project[]) => {
                this.projects = projects ? projects : [];
            });
    }

    linkOnClick(projectId: string) {
        this.goToProject.emit(projectId);
    }

}