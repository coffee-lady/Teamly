import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.less']
})


export class UsersListComponent implements OnInit {

    @Input() title: string;
    @Input() users: Array < object > ;

    constructor() {}

    ngOnInit(): void {}

}