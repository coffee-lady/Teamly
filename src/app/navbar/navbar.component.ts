import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { User } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
    user: User;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.getUser()
            .pipe(
                map(user => {
                    this.user = user;
                }),
                catchError(async (err) => console.error(err)));
    }

    logOut() {
        this.authService.signOut();
    }
}