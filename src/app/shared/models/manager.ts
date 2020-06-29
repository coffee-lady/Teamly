import { User } from '../interfaces';

export class Manager {
    // tslint:disable-next-line: variable-name
    readonly _id: string;
    readonly fullname: string;
    readonly email: string;
    readonly role: string;
    projects: string[];

    constructor(userData: User) {
        this._id = userData._id;
        this.fullname = userData.fullname;
        this.email = userData.email;
        this.role = userData.role;
        this.projects = userData.projects;
    }
}