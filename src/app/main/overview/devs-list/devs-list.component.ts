import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-devs-list',
    templateUrl: './devs-list.component.html',
    styleUrls: ['./devs-list.component.less']
})
export class DevsListComponent implements OnInit {
    user = {
        fullname: 'Anastasiya Leitch',
        email: 'anastasiya.leitch@gmail.com',
        role: 'manager'
    };
    devs = [{
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
        projects: ['stask, CLUBIIP, Delity'].join(',')
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
        projects: ['Tetr, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
        projects: ['ula, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Alex Joi',
        email: 'joi@mail.ru',
        projects: ['stask, Lingwell, IKo'].join(',')
    }, {
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
        projects: ['stask, CLUBIIP, Delity'].join(',')
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
        projects: ['Tetr, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
        projects: ['ula, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Alex Joi',
        email: 'joi@mail.ru',
        projects: ['stask, Lingwell, IKo'].join(',')
    }, {
        fullname: 'Anastasiya Leitch',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Mary Kramer',
        email: 'a.leitch@gmail.com',
        projects: ['stask, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Heyva Fridman',
        email: 'heyva.fridman@mail.ru',
        projects: ['stask, CLUBIIP, Delity'].join(',')
    }, {
        fullname: 'Siaofang Levitt',
        email: 'si.levitt@gmail.com',
        projects: ['Tetr, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Chongan Fridman',
        email: 'y.fridman@gmail.com',
        projects: ['ula, Lingwell, Delity'].join(',')
    }, {
        fullname: 'Alex Joi',
        email: 'joi@mail.ru',
        projects: ['stask, Lingwell, IKo'].join(',')
    }];
    constructor() {}

    ngOnInit(): void {}

}