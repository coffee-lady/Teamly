import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../interfaces';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private http: HttpClient, private authService: AuthService) {}

    getMyTasks(userId: string) {
        return this.http.get(`/my-tasks`, { params: { id: userId } });
    }

    createOrUpdateTask(taskData: Task, projectId: string, taskId ? : string) {
        if (!taskId) {
            return this.http
                .post(`/api/projects/${projectId}/tasks/new`, taskData);
        }
        return this.http
            .post(`/api/projects/${projectId}/tasks/${taskId}`, taskData);
    }

    deleteTask(projectId: string, taskId: string) {
        return this.http
            .delete(`/api/projects/${projectId}/tasks/${taskId}`);
    }

    getTaskData() {
        return this.http
            .get('/api/projects/:projectId/tasks/:taskId');
    }
}