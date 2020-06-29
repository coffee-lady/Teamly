import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task-info',
    templateUrl: './task-info.component.html',
    styleUrls: ['./task-info.component.less', '../../../shared/styles/info.less']
})
export class TaskInfoComponent implements OnInit {
    task = {
        title: 'Set Google Auth',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa.
                  Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
                  em. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
                  aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`,
        createdAt: '21/06/20',
    };

    checkEmail(event: any): void {
        console.log(event.data.email);
    }
    constructor() {}

    ngOnInit(): void {}

}