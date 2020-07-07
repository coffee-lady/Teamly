import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { User, Project } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth/auth.service';
import { ProjectService } from '../shared/services';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
    user: User;
    lastProjectId: string;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.user = this.authService.getUser();
    }

    logOut() {
        this.authService.signOut();
        this.router.navigateByUrl('/auth/login');
    }
}