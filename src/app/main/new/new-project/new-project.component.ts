import { Component, OnInit } from '@angular/core';
import { User, Project } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService, AuthService } from 'src/app/shared/services';

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.less', '../../../shared/styles/info.less']
})
export class NewProjectComponent implements OnInit {
    user: User;
    project: Project;

    form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });

    constructor(private router: Router,
                private projectService: ProjectService,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.project = {
            _id: '',
            title: 'Project1',
            description: 'A new project. Add here your description.',
            createdAt: new Date(),
            managers: [this.user._id],
            managersData: [this.user],
            developersData: [],
            developers: []
        };
        this.form.controls.title.setValue(this.project.title);
        this.form.controls.description.setValue(this.project.description);
    }

    get title() {
        return this.form.get('title').value;
    }

    get description() {
        return this.form.get('description').value;
    }

    assignManager(user: any): void {
        if (this.project.managersData.find(manager => manager._id === user._id)) { return; }
        this.project.managersData.push(user);
        this.project.managers.push(user._id);
    }

    assignDeveloper(user: User): void {
        if (this.project.developersData.find(dev => dev._id === user._id)) { return; }
        this.project.developersData.push(user);
        this.project.developers.push(user._id);
    }

    changeManagers(data: [User[], string[]]) {
        this.project.managersData = data[0];
        this.project.managers = data[1];
    }

    changeDevelopers(data: [User[], string[]]) {
        this.project.developersData = data[0];
        this.project.developers = data[1];
    }

    saveProject() {
        if (this.form.invalid) {
            Object.keys(this.form.controls)
                .forEach(controlName => this.form.controls[controlName].markAsTouched());
            return;
        }
        delete this.project.developersData;
        delete this.project.managersData;
        this.project.title = this.title;
        this.project.description = this.description;
        this.projectService
            .createProject(this.project)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}