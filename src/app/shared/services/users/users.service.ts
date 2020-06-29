import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { Developer } from '../../models';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }

    constructor(private http: HttpClient) {}

    findDeveloper(emailOrName: string) {
        return this.http
            .post('/api/developers/search', emailOrName)
            .pipe(catchError(this.handleError));
    }

    updateDeveloper(userData: Developer, devId: string) {
        return this.http
            .post(`/api/developers/${devId}`, userData)
            .pipe(catchError(this.handleError));
    }

    getDevelopersList() {
        return this.http
            .get < Developer[] > ('/api/developers')
            .pipe(
                map((listOfUsers: Developer[]) =>
                    listOfUsers.map((singleUser: Developer) => new Developer(singleUser))),
                catchError(this.handleError));
    }
}