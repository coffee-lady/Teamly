import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient) {}

    getMyTasks(userId: string) {
        return this.http
        .get(`/api/my-tasks`, { params: { id: userId } });
    }

    createTask(taskData: Task, projectId: string) {
        return this.http
            .post(`/api/tasks/project-${projectId}/new`, taskData);
    }

    updateTask(taskData: Task, projectId: string, taskId: string) {
        return this.http
            .post(`/api/tasks/project-${projectId}/task-${taskId}`, taskData);
    }

    deleteTask(projectId: string, taskId: string) {
        return this.http
            .delete(`/api/tasks/project-${projectId}/task-${taskId}`);
    }

    getTaskData(projectId: string, taskId: string) {
        return this.http
            .get(`/api/tasks/project-${projectId}/task-${taskId}`);
    }
}