import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenStorage {
    private tokenKey = 'dsfds4654gf-75445ds64f-86415ds45df-47sd4sf2d6';

    signOut(): void {
        localStorage.removeItem(this.tokenKey);
        localStorage.clear();
    }

    saveToken(token ?: string): void {
        if (!token) { return; }
        localStorage.setItem(this.tokenKey, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }
    constructor() {}
}