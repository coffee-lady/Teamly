import { Component, OnInit } from '@angular/core';
import { User, Task } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TaskService } from 'src/app/shared/services/tasks/tasks.service';
import { forkJoin } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';
import { UsersService } from 'src/app/shared/services';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.less']
})
export class MyTasksComponent implements OnInit {
    tasks: Task[];

    user: User;

    constructor(private authService: AuthService, private taskService: TaskService, private userService: UsersService) {}

    ngOnInit(): void {
        this.authService
            .me()
            .pipe(
                mergeMap((user: User) => {
                    this.user = user;
                    return this.taskService.getMyTasks(user._id);
                }))
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
            });
    }

    scrollToProject(event: any) {
        const id = event.data.devId;
        const devTr = document.querySelector(`tr[[id]="${id}"]`);
        const yCoord = devTr.getBoundingClientRect().top + pageYOffset;
        document.documentElement.scrollTo(0, yCoord);
    }

    markAsCompleted(taskId: string) {
        const taskData = this.tasks.find(task => task._id === taskId);
        taskData.completed = true;
        delete taskData.developerData;
        delete taskData.projectData;
        this.taskService.createOrUpdateTask(taskData, taskData.projectId, taskData._id).subscribe();
    }

    removeFromMyTasks(taskId: string) {
        this.user.currentTasks.splice(this.user.currentTasks.indexOf(taskId), 1);
        this.userService.updateDeveloper(this.user).subscribe();
    }

}