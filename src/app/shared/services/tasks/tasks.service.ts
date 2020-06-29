import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../interfaces';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { TaskModel } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    constructor(private http: HttpClient) {}

    createOrUpdateTask(taskData: Task, projectId: string, taskId ?: string) {
        if (!taskId) {
            return this.http
                .post(`/api/projects/${projectId}/tasks/new`, taskData)
                .pipe(catchError(this.handleError));
        }
        return this.http
            .post(`/api/projects/${projectId}/tasks/${taskId}`, taskData)
            .pipe(catchError(this.handleError));
    }

    deleteTask(projectId: string, taskId: string) {
        return this.http
            .delete(`/api/projects/${projectId}/tasks/${taskId}`)
            .pipe(catchError(this.handleError));
    }

    getTaskData() {
        return this.http
            .get('/api/projects/:projectId/tasks/:taskId')
            .pipe(
                map((taskData: Task) => new TaskModel(taskData)),
                catchError(this.handleError));
    }
}