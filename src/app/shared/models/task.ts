import { Task } from '../interfaces';

export class TaskModel {
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
    projectName: string;
    takenByDev: string | null;

    constructor(projectData: Task) {
        this.title = projectData.title;
        this.description = projectData.description;
        this.createdAt = projectData.createdAt;
        this.dueDate = projectData.dueDate;
        this.projectName = projectData.projectName;
        this.takenByDev = projectData.takenByDev;
    }
}