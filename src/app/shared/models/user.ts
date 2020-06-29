import { User } from '../interfaces';

export class UserModel {
    readonly id: string;
    readonly fullname: string;
    readonly email: string;
    readonly role: string;
    projects: string[];
    currentTasks: string[];

    constructor(userData: User) {
        this.id = userData._id;
        this.fullname = userData.fullname;
        this.email = userData.email;
        this.role = userData.role;
        this.projects = userData.projects;
        this.currentTasks = userData.currentTasks;
    }
}