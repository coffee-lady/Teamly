import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Project } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    constructor(private http: HttpClient) {}

    createProject(projectData: Project) {
        return this.http.post(`/api/new/project`, projectData);
    }

    updateProject(projectData: Project, projectId: string) {
        return this.http.post(`/api/projects/${projectId}`, projectData);
    }

    findProject(projectName: string) {
        return this.http.post('/api/projects/search', projectName);
    }

    findProjectById(id: string) {
        return this.http.post('/api/projects/searchById', { projectId: id });
    }

    deleteProject(projectId: string) {
        return this.http.delete(`/api/projects/${projectId}`);
    }

    getProjectData(projectId: string) {
        return this.http.get(`/api/projects/${projectId}`);
    }

    getProjects() {
        return this.http.get('/api/projects');
    }
}