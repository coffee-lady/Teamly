import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-my-tasks',
    templateUrl: './my-tasks.component.html',
    styleUrls: ['./my-tasks.component.less']
})
export class MyTasksComponent implements OnInit {
    project = {
        title: 'Tetraedrum',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aenean commodo ligula eget dolor. Aenean massa.
Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
em. Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
aliquet nec, vulputate eget, arcu.
In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.`,
        createdAt: '21/06/20',
        managers: ['Anastasiya Leitch', 'Heyva Fridman', 'Alex Solomintsev', 'Mary Kramer'],
        developers: ['Tatyana Velikaya', 'Sima Leitch', 'Max Tomsky', 'Anastasiya Serebryanskaya', 'Venkeng Solony', 'Alex Solomintsev', 'Max Tomsky', 'Alex Solomintsev'],
    };
    tasks = [{
        projectName: 'stask',
        title: 'Create News Block',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '26/05/2020',
        completed: false
    }, {
        projectName: 'Delity',
        title: 'Set Google Auth',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '30/05/2020',
        completed: false
    }, {
        projectName: 'Tetraedrum',
        title: 'Make The Design',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '02/06/2020',
        completed: true
    }, {
        projectName: 'ClubIT',
        title: 'Print Hello World',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '10/06/2020',
        completed: false
    }, {
        projectName: 'Delity',
        title: 'Set Google Auth',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '30/05/2020',
        completed: false
    }, {
        projectName: 'Tetraedrum',
        title: 'Make The Design',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '02/06/2020',
        completed: true
    }, {
        projectName: 'ClubIT',
        title: 'Print Hello World',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '10/06/2020',
        completed: false
    }, {
        projectName: 'Delity',
        title: 'Set Google Auth',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '30/05/2020',
        completed: false
    }, {
        projectName: 'Tetraedrum',
        title: 'Make The Design',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '02/06/2020',
        completed: true
    }, {
        projectName: 'ClubIT',
        title: 'Print Hello World',
        description: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean commodo ligula eget dolor. Aenean massa...`,
        dueDate: '10/06/2020',
        completed: false
    }];
    user = {
        fullname: 'Anastasiya Leitch',
        email: 'anastasiya.leitch@gmail.com',
        role: 'manager'
    };

    constructor() {}

    ngOnInit(): void {}

}