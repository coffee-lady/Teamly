import { Component, OnInit } from '@angular/core';
import { User, Project } from 'src/app/shared/interfaces';
import { ProjectService, AuthService, UsersService, TaskService } from 'src/app/shared/services';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-project-overview',
    templateUrl: './project-overview.component.html',
    styleUrls: ['./project-overview.component.less', '../../../shared/styles/table.less']
})
export class ProjectOverviewComponent implements OnInit {
    private projectId = this.route.snapshot.params.projectId;
    user: User;
    project: Project;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private userService: UsersService,
        private projectService: ProjectService,
        private taskService: TaskService,
        private authService: AuthService) {}

    ngOnInit(): void {
        const userData = this.authService.me();
        const projectData = this.projectService.getProjectData(this.projectId);

        forkJoin([userData, projectData]).subscribe((result: any) => {
            this.user = result[0];
            this.project = result[1];
        });
    }

    scrollToProject(event: any) {
        const id = event.data.devId;
        const devTr = document.querySelector(`tr[[id]="${id}"]`);
        const yCoord = devTr.getBoundingClientRect().top + pageYOffset;
        document.documentElement.scrollTo(0, yCoord);
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
    }

    markAsCompleted(taskId: string) {
        const taskData = this.project.tasksData.find(task => {
            task.completed = (task._id === taskId) ? true : task.completed;
            if (task._id === taskId) { return true; }
        });
        this.taskService.createOrUpdateTask(taskData, this.projectId, taskData._id).subscribe();
    }

    editTask(taskId: string) {
        this.router.navigateByUrl(`/projects/${this.projectId}/tasks/${taskId}`);
    }

    deleteTask(taskId: string) {
        this.taskService.deleteTask(this.projectId, taskId).subscribe();
    }

}