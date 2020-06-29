import { Project } from '../interfaces';

export class ProjectModel {
    title: string;
    description: string;
    createdAt: Date;
    managers: string[];
    developers: string[];
    tasks: string[];

    constructor(projectData: Project) {
        this.title = projectData.title;
        this.description = projectData.description;
        this.createdAt = projectData.createdAt;
        this.managers = projectData.managers;
        this.developers = projectData.developers;
        this.tasks = projectData.tasks;
    }
}