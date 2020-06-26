import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
    user = {
        fullname: 'Anastasiya Leitch',
        email: 'anastasiya.leitch@gmail.com',
        role: 'manager'
    };

    constructor() {}

    ngOnInit(): void {}

}