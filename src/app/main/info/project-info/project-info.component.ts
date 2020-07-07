import { Component, OnInit } from '@angular/core';
import { Project, User } from 'src/app/shared/interfaces';
import { ProjectService } from 'src/app/shared/services/projects/projects.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-project-info',
    templateUrl: './project-info.component.html',
    styleUrls: ['./project-info.component.less', '../../../shared/styles/info.less']
})


export class ProjectInfoComponent implements OnInit {
    user: User;
    project: Project;

    form: FormGroup = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });

    constructor(private router: Router,
                private route: ActivatedRoute,
                private projectService: ProjectService,
                private authService: AuthService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.projectService
            .getProjectData(this.route.snapshot.paramMap.get('projectId'))
            .subscribe((proj: Project) => {
                this.project = proj;
                this.form.controls.title.setValue(proj.title);
                this.form.controls.description.setValue(proj.description);
            });
    }

    get title() {
        return this.form.get('title').value;
    }

    get description() {
        return this.form.get('description').value;
    }

    assignManager(user: User): void {
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
        delete this.project.tasksData;
        this.project.title = this.title;
        this.project.description = this.description;

        this.projectService
            .updateProject(this.project, this.project._id)
            .subscribe(() => {
                console.log(this.project);
                this.router.navigateByUrl('/');
            });
    }

    deleteProject() {
        if (!this.project._id) { return; }
        this.projectService
            .deleteProject(this.project._id)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}