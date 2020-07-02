import { User } from './user.interface';
import { Project } from './project.interface';

export interface Task {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
    projectId: string;
    projectData ?: Project;
    takenByDev ?: string;
    developerData ?: User;
}