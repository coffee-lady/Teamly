import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap, pluck, map, mergeMap, catchError } from 'rxjs/operators';

import { TokenStorage } from './token.storage';
import { User } from '../../interfaces';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user$: User | null = null;

    constructor(private router: Router, private http: HttpClient, private tokenStorage: TokenStorage) {}

    login(email: string, password: string): Observable < HttpResponse < { user ?: User, token ?: string } > > {
        return this.http
            .post('/api/auth/login', { email, password }, { observe: 'response' })
            .pipe(map((response: HttpResponse < { user ?: User, token ?: string } > ) => {
                if (response.body.token) {
                    this.setUser(response.body.user);
                    this.tokenStorage.saveToken(response.body.token);
                }
                return response;
            }));
    }

    register(fullname: string, email: string, password: string, role: string):
        Observable < HttpResponse < { user: User, token: string } > > {
            return this.http
                .post('/api/auth/register', { fullname, email, password, role }, { observe: 'response' })
                .pipe(map((response: HttpResponse < { user: User, token: string } > ) => {
                    this.setUser(response.body.user);

                    this.tokenStorage.saveToken(response.body.token);
                    return response;
                }));
        }

    setUser(user: User | null): void {
        this.user$ = user;
    }

    getUser(): User | null {
        return this.user$;
    }

    signOut(): void {
        this.tokenStorage.signOut();
        this.setUser(null);
    }

    getAuthorizationHeaders() {
        const token: string | null = this.tokenStorage.getToken() || '';
        return { Authorization: `Bearer ${token}` };
    }
}