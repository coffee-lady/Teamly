import { User } from '.';
import { Task } from './task.interface';

export interface Project {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
    managers: string[];
    managersData ?: User[];
    developers ?: string[];
    developersData ?: User[];
    tasks ?: string[];
    tasksData ?: Task[];
}