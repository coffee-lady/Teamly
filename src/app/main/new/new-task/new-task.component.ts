import { Component, OnInit } from '@angular/core';
import { Task, Project, User } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { dueDateValidator } from 'src/app/shared/validators';
import { Router } from '@angular/router';
import { TaskService, ProjectService } from 'src/app/shared/services';
import { DatePipe } from '@angular/common';

import * as moment from 'moment';

@Component({
    selector: 'app-new-task',
    templateUrl: './new-task.component.html',
    styleUrls: ['./new-task.component.less', '../../../shared/styles/info.less']
})
export class NewTaskComponent implements OnInit {
    task: Task;
    projects: Project[];

    form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        dueDateString: new FormControl('', [Validators.required, dueDateValidator]),
        projectId: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router,
                private taskService: TaskService,
                private projectService: ProjectService,
                private datePipe: DatePipe) {}

    ngOnInit(): void {
        this.task = {
            _id: '',
            title: 'Task1',
            description: 'A new task. Add here your description.',
            createdAt: new Date(),
            dueDate: null,
            completed: false,
            projectId: null,
            takenByDev: null
        };
        this.form.controls.title.setValue(this.task.title);
        this.form.controls.description.setValue(this.task.description);
        this.projectService
            .getProjects()
            .subscribe((projects: Project[]) => {
                this.projects = projects;
            });
    }

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

    chooseProject(project: Project) {
        this.form.controls.projectId.setValue(project._id);
        this.task.projectId = project._id;
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
        this.task.dueDate = moment(this.dueDateString, 'DD/MM/YYYY').toDate();
        delete this.task.developerData;
        this.taskService
            .createTask(this.task, this.task.projectId)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}