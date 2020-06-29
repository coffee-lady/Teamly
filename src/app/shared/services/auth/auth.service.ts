import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { TokenStorage } from './token.storage';
import { User } from '../../interfaces';

declare global {
    interface Window { user: any; }
}
window.user = window.user || {};

interface AuthResponse {
    token: string;
    user: User;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private user$ = new BehaviorSubject < User | null > (null);

    constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

    login(email: string, password: string): Observable < User > {
        return this.http
            .post < AuthResponse > ('/api/auth/login', { email, password })
            .pipe(
                tap(({ token, user }) => {
                    this.setUser(user);
                    this.tokenStorage.saveToken(token);
                }),
                pluck('user')
            );
    }

    register(
        fullname: string,
        email: string,
        password: string,
    ): Observable < User > {
        return this.http
            .post < AuthResponse > ('/api/auth/register', {
                fullname,
                email,
                password,
            })
            .pipe(
                tap(({ token, user }) => {
                    this.setUser(user);
                    this.tokenStorage.saveToken(token);
                }),
                pluck('user')
            );
    }

    setUser(user: User | null): void {
        this.user$.next(user);
        window.user = user;
    }

    getUser(): Observable < User | null > {
        return this.user$.asObservable();
    }

    me(): Observable < User > {
        const token: string | null = this.tokenStorage.getToken();

        if (token === null) {
            return null;
        }

        return this.http.get < AuthResponse > ('/api/auth/me').pipe(
            tap(({ user }) => this.setUser(user)),
            pluck('user')
        );
    }

    signOut(): void {
        this.tokenStorage.signOut();
        this.setUser(null);
        delete window.user;
    }

    getAuthorizationHeaders() {
        const token: string | null = this.tokenStorage.getToken() || '';
        return { Authorization: `Bearer ${token}` };
    }

    checkTheUserOnTheFirstLoad(): Promise < User > {
        return this.me().toPromise();
    }
}