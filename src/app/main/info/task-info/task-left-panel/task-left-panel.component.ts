import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task-left-panel',
    templateUrl: './task-left-panel.component.html',
    styleUrls: ['./task-left-panel.component.less', '../../../../shared/styles/dropdown.less']
})
export class TaskLeftPanelComponent implements OnInit {
    userRole: string;

    task = {
        dueDate: '26/06/20',
        takenByDev: {
            fullname: 'Sima leitch',
            email: 'sima.leitch@gmail.com'
        }
    };
    projects = [{
        title: 'stask'
    }, {
        title: 'Lingwell'
    }, {
        title: 'teamly'
    }, {
        title: 'Tetraedrum'
    }, {
        title: 'fireL'
    }];

    chooseRole(elem: string) {
        this.userRole = elem;
    }

    constructor() {}

    ngOnInit(): void {}

}