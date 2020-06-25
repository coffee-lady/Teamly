import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-devs-list',
    templateUrl: './devs-list.component.html',
    styleUrls: ['./devs-list.component.less']
})
export class DevsListComponent implements OnInit {
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

    constructor() {}

    ngOnInit(): void {}

}