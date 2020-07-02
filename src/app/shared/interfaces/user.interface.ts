import { Project } from '.';

export interface User {
    _id: string;
    fullname: string;
    email: string;
    role: string;
    projects: string[];
    projectsData: Project[];
    currentTasks?: string[];
}