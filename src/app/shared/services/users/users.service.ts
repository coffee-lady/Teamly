import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private http: HttpClient) {}

    findUserById(userId: string) {
        return this.http.post('/api/users/searchById', { id: userId });
    }

    findUsers(emailOrName: string, userRole: string | null) {
        return this.http.post('/api/users/search', { searchString: emailOrName, role: userRole });
    }

    updateDeveloper(userData: User) {
        return this.http.post(`/api/users/developers/${userData._id}`, userData);
    }

    getDevelopersList() {
        return this.http.get('/api/users/developers');
    }

    deleteDeveloper(devId: string) {
        return this.http.delete(`/api/users/developers/${devId}`);
    }
}