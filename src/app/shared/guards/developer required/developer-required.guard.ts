import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DeveloperRequiredGuard implements CanActivate {
    user: User;

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): boolean {
        this.user = this.authService.getUser();
        if (this.user.role === 'developer') { return true; }

        this.router.navigateByUrl('/');
        return false;
    }
}