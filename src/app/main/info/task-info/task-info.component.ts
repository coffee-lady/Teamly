import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Task, Project } from 'src/app/shared/interfaces';
import { Subject, forkJoin } from 'rxjs';

import { dueDateValidator } from 'src/app/shared/validators';
import { UsersService, TaskService, ProjectService, DateService } from 'src/app/shared/services';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.less', '../../../shared/styles/info.less']
})
export class TaskInfoComponent implements OnInit, OnDestroy {
    private readonly onDestroy = new Subject < void > ();

    task: Task;
    projects: Project[];

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
        this.dueDateString = str;
    }

    get dueDateString() {
        return this.dateService.formatDateString(this.form.get('dueDateString').value);
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private taskService: TaskService,
                private projectService: ProjectService,
                private dateService: DateService) {}

    ngOnInit(): void {
        const taskId = this.route.snapshot.params.get('taskId');
        const taskData = this.taskService.getTaskData(taskId);
        const projectsData = this.projectService.getProjects();

        forkJoin([taskData, projectsData]).subscribe((result: any) => {
            const task = result[0];
            this.task = task;
            this.form.controls.title.setValue(this.task.title);
            this.form.controls.description.setValue(this.task.description);
            this.form.controls.dueDateString.setValue(this.dateService.formatDateToString(this.task.dueDate));

            this.projects = result[1];
        });
    }

    ngOnDestroy() {
        this.onDestroy.next();
    }

    chooseProject(event: any) {
        this.task.projectId = event.data.elem._id;
    }

    assignDeveloper(dev: User): void {
        this.task.developerData = dev;
        this.task.takenByDev = dev._id;
    }

    removeDeveloper() {
        this.task.developerData = null;
        this.task.takenByDev = null;
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
        this.task.dueDate = new Date(this.dueDateString);
        this.taskService
            .updateTask(this.task, this.task.projectId, this.task._id)
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