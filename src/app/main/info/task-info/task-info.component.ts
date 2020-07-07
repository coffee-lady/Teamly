import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, Task, Project } from 'src/app/shared/interfaces';
import { Subject, forkJoin } from 'rxjs';

import { dueDateValidator } from 'src/app/shared/validators';
import { TaskService, ProjectService } from 'src/app/shared/services';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.less', '../../../shared/styles/info.less']
})
export class TaskInfoComponent implements OnInit, OnDestroy {
    private readonly onDestroy = new Subject < void > ();
    private readonly taskId = this.route.snapshot.params.taskId;

    task: Task;
    projects: Project[];

    form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dueDateString: new FormControl('', [Validators.required, dueDateValidator]),
        projectId: new FormControl('', [Validators.required]),
    });

    get title() {
        return this.form.get('title').value;
    }

    get description() {
        return this.form.get('description').value;
    }

    get projectId() {
        return this.form.get('projectId').value;
    }

    get dueDateString() {
        return this.form.get('dueDateString').value.replace(/[.-]/g, '/');
    }

    constructor(private router: Router,
                private route: ActivatedRoute,
                private taskService: TaskService,
                private projectService: ProjectService,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.form.controls.projectId.setValue(this.route.snapshot.params.projectId);
        const taskData = this.taskService.getTaskData(this.projectId, this.taskId);
        const projectsData = this.projectService.getProjects();

        forkJoin([taskData, projectsData]).subscribe((result: any) => {
            const task = result[0];
            this.task = task;
            this.form.controls.title.setValue(this.task.title);
            this.form.controls.description.setValue(this.task.description);
            this.form.controls.dueDateString.setValue(this.datePipe.transform(this.task.dueDate, 'dd/MM/yyyy'));

            this.projects = result[1];
        });
    }

    ngOnDestroy() {
        this.onDestroy.next();
    }

    chooseProject(project: Project) {
        this.form.controls.projectId.setValue(project._id);
    }

    assignDeveloper(dev: User): void {
        this.task.developerData = dev;
        this.task.takenByDev = dev._id;
    }

    removeFromProject() {
        this.form.controls.projectId.setValue(null);
        this.task.projectData = null;
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
        this.task.projectId = this.projectId;
        delete this.task.developerData;
        this.task.dueDate = moment(this.dueDateString, 'DD/MM/YYYY').toDate();
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