import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
    selector: 'app-devs-list',
    templateUrl: './devs-list.component.html',
    styleUrls: ['./devs-list.component.less']
})
export class DevsListComponent implements OnInit {
    user: User;
    devs: User[];

    constructor(private authService: AuthService, private userService: UsersService) {}

    ngOnInit(): void {
        this.authService
            .getUser()
            .subscribe(user => {
                this.user = user;
            });

        this.userService
            .getDevelopersList()
            .subscribe(devs => {
                this.devs = devs;
            });
    }
}