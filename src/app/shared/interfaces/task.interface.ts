export interface Task {
    title: string;
    description: string;
    createdAt: Date;
    dueDate: Date;
    completed: boolean;
    projectName: string;
    takenByDev ?: string;
}