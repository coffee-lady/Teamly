import { Component, OnInit } from '@angular/core';
import { User, Task } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { TaskService } from 'src/app/shared/services/tasks/tasks.service';
import { UsersService } from 'src/app/shared/services';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.less', '../../../shared/styles/table.less']
})
export class MyTasksComponent implements OnInit {
    tasks: Task[];
    user: User;

    constructor(private authService: AuthService, private taskService: TaskService, private userService: UsersService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
        this.taskService
            .getMyTasks(this.user._id)
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;
            });
    }

    scrollToProject(id: string) {
        const table: HTMLElement = document.querySelector('.table');
        const devTr: HTMLElement = document.querySelector(`[id="${id}"]`);
        table.scrollTop = devTr.offsetTop;
    }

    markAsCompleted(taskId: string) {
        const taskData = this.tasks.find(task => task._id === taskId);
        taskData.completed = true;
        delete taskData.developerData;
        delete taskData.projectData;
        this.taskService.updateTask(taskData, taskData.projectId, taskData._id).subscribe();
    }

    removeFromMyTasks(taskId: string) {
        this.user.currentTasks.splice(this.user.currentTasks.indexOf(taskId), 1);
        this.userService.updateDeveloper(this.user).subscribe();

        const taskData = this.tasks.find(task => task._id === taskId);
        taskData.takenByDev = null;
        this.taskService.updateTask(taskData, taskData.projectId, taskData._id);
    }
}