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
                private route: ActivatedRoute,
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
    }

    assignManager(event: any): void {
        this.project.managersData.push(event.userToAssign);
        this.project.managers.push(event.userToAssign._id);
    }

    assignDeveloper(event: any): void {
        this.project.developersData.push(event.userToAssign);
        this.project.developers.push(event.userToAssign._id);
    }

    saveProject() {
        if (this.form.invalid) {
            Object.keys(this.form.controls)
                .forEach(controlName => this.form.controls[controlName].markAsTouched());
            return;
        }
        delete this.project.developersData;
        delete this.project.managersData;
        this.projectService
            .createProject(this.project)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            });
    }
}