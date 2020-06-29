export interface Project {
    title: string;
    description: string;
    createdAt: Date;
    managers: string[];
    developers ?: string[];
    tasks ?: string[];
}