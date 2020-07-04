import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';
import { User } from '../../interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    user: User;

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(): boolean {
        this.user = this.authService.getUser();
        if (this.user) {
            return true;
        }

        this.router.navigateByUrl('/auth/login');
        return false;
    }
}