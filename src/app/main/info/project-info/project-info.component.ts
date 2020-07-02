import { Component, OnInit } from '@angular/core';
import { Project, User } from 'src/app/shared/interfaces';
import { ProjectService } from 'src/app/shared/services/projects/projects.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

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
        const userData = this.authService.me();
        const projectData = this.projectService.getProjectData(this.route.snapshot.params.projectId);

        forkJoin([userData, projectData]).subscribe((result: any) => {
            this.user = result[0];
            const project: Project = result[1];
            if (!project) {
                this.project = {
                    _id: null,
                    title: 'Project1',
                    description: 'A new project. Add here your description.',
                    createdAt: new Date(),
                    managers: [this.user._id],
                    managersData: [this.user],
                    developersData: [],
                    developers: []
                };
                return;
            }
            this.project = project;
        });
    }

    assignManager(event: any): void {
        this.project.managersData.push(event.data.userToAssign);
        this.project.managers.push(event.data.userToAssign._id);
    }

    assignDeveloper(event: any): void {
        this.project.developersData.push(event.data.userToAssign);
        this.project.developers.push(event.data.userToAssign._id);
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
            .createOrUpdateProject(this.project, this.project._id)
            .subscribe(() => {
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