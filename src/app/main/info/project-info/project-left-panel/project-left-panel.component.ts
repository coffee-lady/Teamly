import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-project-left-panel',
    templateUrl: './project-left-panel.component.html',
    styleUrls: ['./project-left-panel.component.less']
})
export class ProjectLeftPanelComponent implements OnInit {
    managers = [{
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
    }];
    developers = [{
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
    }, {
        fullname: 'Alex Joi',
        email: 'joi@mail.ru',
    }, {
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
    }, {
        fullname: 'Alex Joi',
        email: 'joi@mail.ru',
    }, {
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
    }];
    constructor() {}

    ngOnInit(): void {}

}