import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectModel } from '../../models/project';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Project } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
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

    createOrUpdateProject(projectData: Project, projectId ?: string) {
        if (!projectId) {
            return this.http
            .post(`/api/projects/new`, projectData)
            .pipe(catchError(this.handleError));
        }
        return this.http
            .post(`/api/projects/${projectId}`, projectData)
            .pipe(catchError(this.handleError));
    }

    findProject(projectName: string) {
        return this.http
            .post('/api/projects/search', projectName)
            .pipe(catchError(this.handleError));
    }

    deleteProject(projectId: string) {
        return this.http
            .delete(`/api/projects/${projectId}`)
            .pipe(catchError(this.handleError));
    }

    getProjectData() {
        return this.http
            .get('/api/projects/:projectId')
            .pipe(
                map((projectData: Project) => new ProjectModel(projectData)),
                catchError(this.handleError));
    }
}