import { Component, OnInit } from '@angular/core';
import { User, Project } from 'src/app/shared/interfaces';
import { ProjectService, AuthService, UsersService, TaskService } from 'src/app/shared/services';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-project-overview',
    templateUrl: './project-overview.component.html',
    styleUrls: ['./project-overview.component.less', '../../../shared/styles/table.less']
})
export class ProjectOverviewComponent implements OnInit {
    projectId: string;
    user: User;
    project: Project;
    lastProjectId: string;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private authService: AuthService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.projectService
            .getProjects()
            .pipe(
                map((projects: Project[]) =>
                    this.lastProjectId = projects[projects.length - 1]._id ? projects[projects.length - 1]._id : null),
                mergeMap(() => this.route.paramMap),
                map(paramMap => {
                    this.projectId = paramMap.get('projectId');
                    if (!this.projectId && this.lastProjectId) {
                        this.router.navigateByUrl(`/projects/${this.lastProjectId}`);
                    }
                    return paramMap.get('projectId');
                }),
                mergeMap((projectId: string) => this.projectService.getProjectData(projectId)))
            .subscribe((project: Project) => {
                this.project = project;
            }, (err) => { if (err) { console.error(err); } });
    }

    goToProject(projectId: string) {
        this.router.navigateByUrl(`/projects/${projectId}`);
    }

    takeTheTask(taskId: string): void {
        this.user.currentTasks.push(taskId);
        this.userService
            .updateDeveloper(this.user)
            .subscribe((dev: User) => {
                for (const task of this.project.tasksData) {
                    task.takenByDev = (task._id === taskId) ?
                        dev._id :
                        task.takenByDev;
                }
            });

        const taskData = this.project.tasksData.find(task => {
            task.takenByDev = (task._id === taskId) ? this.user._id : task.takenByDev;
            if (task._id === taskId) { return true; } else { return false; }
        });

        this.taskService.updateTask(taskData, this.projectId, taskData._id).subscribe();
    }

    markAsCompleted(taskId: string) {
        const taskData = this.project.tasksData.find(task => {
            task.completed = (task._id === taskId) ? true : task.completed;
            if (task._id === taskId) { return true; }
        });
        this.taskService.updateTask(taskData, this.projectId, taskData._id).subscribe();
    }

    editTask(taskId: string) {
        this.router.navigateByUrl(`/projects/${this.projectId}/tasks/${taskId}`);
    }

    deleteTask(taskId: string) {
        this.taskService.deleteTask(this.projectId, taskId).subscribe();
    }
}