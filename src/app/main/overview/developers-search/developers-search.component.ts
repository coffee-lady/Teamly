import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-developers-search',
    templateUrl: './developers-search.component.html',
    styleUrls: ['./developers-search.component.less']
})
export class DevelopersSearchComponent implements OnInit {
    results = [
        { title: 'Lingwell', createdAt: '15/06/20' },
        { title: 'Tetraedrum', createdAt: '21/06/20' },
        { title: 'UTEAM', createdAt: '21/06/20' },
        { title: 'Brancy', createdAt: '23/06/20' },
        { title: 'Delity', createdAt: '25/06/20' },
    ];

    constructor() {}

    ngOnInit(): void {}

}