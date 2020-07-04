import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { Task, Project, User } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dueDateValidator } from 'src/app/shared/validators';
import { Router } from '@angular/router';
import { UsersService, TaskService, ProjectService, DateService } from 'src/app/shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.less', '../../../shared/styles/info.less']
})
export class NewTaskComponent implements OnInit {
    task: Task = {
        _id: '',
        title: 'Task1',
        description: 'A new task. Add here your description.',
        createdAt: new Date(),
        dueDate: null,
        completed: false,
        projectId: null,
        takenByDev: null
    };
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
                private usersService: UsersService,
                private taskService: TaskService,
                private projectService: ProjectService,
                private dateService: DateService) {}

    ngOnInit(): void {
        this.projectService
            .getProjects().subscribe((projects: Project[]) => {
                this.projects = projects;
            });
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
            .findUserById(this.task.takenByDev)
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
            .subscribe(() => {
                this.task.takenByDev = null;
                this.task.developerData = null;
            });
    }

    saveTask() {
        if (this.form.invalid) {
            Object.keys(this.form.controls)
                .forEach(controlName => this.form.controls[controlName].markAsTouched());
            return;
        }
        this.task.title = this.title;
        this.task.description = this.description;
        delete this.task.developerData;
        this.taskService
            .createTask(this.task, this.task.projectId)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}