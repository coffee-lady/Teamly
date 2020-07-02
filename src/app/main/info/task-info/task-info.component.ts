import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Task, Project } from 'src/app/shared/interfaces';
import { throwError, Subject, forkJoin } from 'rxjs';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { dueDateValidator } from 'src/app/shared/validators';
import { UsersService, TaskService, ProjectService, DateService } from 'src/app/shared/services';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.less', '../../../shared/styles/info.less']
})
export class TaskInfoComponent implements OnInit, OnDestroy {
    private readonly onDestroy = new Subject < void > ();

    task: Task;
    projects: Project[];
    isNew = true;

    form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dueDateString: new FormControl('', [Validators.required, dueDateValidator])
    });

    get title() {
        return this.form.get('title').value;
    }

    get description() {
        return this.form.get('description').value;
    }

    set dueDateString(str) {
        this.task.dueDate = new Date(str);
    }

    get dueDateString() {
        return this.dateService.formatDateString(this.form.get('dueDate').value);
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private usersService: UsersService,
                private taskService: TaskService,
                private projectService: ProjectService,
                private dateService: DateService) {}

    ngOnInit(): void {
        const taskData = this.taskService.getTaskData();
        const projectsData = this.projectService.getProjects();

        forkJoin([taskData, projectsData]).subscribe((result: any) => {
            const task = result[0];
            if (!task) {
                this.task = {
                    _id: null,
                    title: 'Task1',
                    description: 'A new task. Add here your description.',
                    createdAt: new Date(),
                    dueDate: null,
                    completed: false,
                    projectId: null,
                    takenByDev: null
                };
                const projectId = this.route.snapshot.params.projectId;
                if (projectId) {
                    this.task.projectId = projectId;
                    this.projectService
                        .findProjectById(projectId)
                        .subscribe((project: Project) => this.task.projectData = project);
                }
                return;
            }
            this.isNew = false;
            this.task = task;
            this.dueDateString = this.dateService.formatDateToString(task.dueDate);

            this.projects = result[1];
        });
    }

    ngOnDestroy() {
        this.onDestroy.next();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    chooseProject(event: any) {
        this.task.projectId = event.data.elem._id;
    }

    assignDeveloper(event: any): void {
        this.task.takenByDev = event.data.userToAssign._id;
        this.usersService
            .findUserById(this.task.takenByDev).pipe(
                map((dev: User) => {
                    dev.currentTasks.find(taskId => dev.currentTasks.push(taskId));
                    return dev;
                }),
                mergeMap(dev => this.usersService.updateDeveloper(dev)),
                takeUntil(this.onDestroy)
            )
            .subscribe((dev: User) => {
                this.task.developerData = dev;
            });
    }

    removeDeveloper() {
        this.usersService
            .findUserById(this.task.takenByDev)
            .pipe(
                map((dev: User) => {
                    for (const taskId of dev.currentTasks) {
                        dev.currentTasks = (taskId === this.task._id) ?
                            dev.currentTasks.splice(dev.currentTasks.indexOf(taskId), 1) :
                            dev.currentTasks;
                    }
                    return dev;
                }),
                mergeMap(dev => this.usersService.updateDeveloper(dev)))
            .subscribe();
    }

    saveTask() {
        if (this.form.invalid) {
            Object.keys(this.form.controls)
                .forEach(controlName => this.form.controls[controlName].markAsTouched());
            return;
        }
        this.task.title = this.title;
        this.task.description = this.description;
        this.taskService
            .createOrUpdateTask(this.task, this.task.projectId, this.task._id)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }

    deleteTask() {
        if (!this.task._id || !this.task.projectId) { return; }
        this.taskService
            .deleteTask(this.task.projectId, this.task._id)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}