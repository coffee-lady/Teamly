import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-developers-search',
    templateUrl: './developers-search.component.html',
    styleUrls: ['./developers-search.component.less']
})
export class DevelopersSearchComponent implements OnInit {
    results = [{
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
    }];

    constructor() {}

    ngOnInit(): void {}

}