import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ManagerRequiredGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): Observable < boolean > {
        return this.authService
            .getUser()
            .pipe(
                map(user => {
                    if (user.role === 'manager') { return true; }

                    this.router.navigateByUrl('/');
                    return false;
                })
            );
    }
}