import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/interfaces';
import { fromEvent, from, of } from 'rxjs';
import { debounce, filter, debounceTime, map, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-developers-search',
    templateUrl: './developers-search.component.html',
    styleUrls: ['./developers-search.component.less']
})
export class DevelopersSearchComponent implements OnInit {
    // results = [{
    //     fullname: 'Anastasiya Leitch',
    //     email: 'a.leitch@gmail.com',
    // }, {
    //     fullname: 'Mary Kramer',
    //     email: 'a.leitch@gmail.com',
    // }, {
    //     fullname: 'Heyva Fridman',
    //     email: 'heyva.fridman@mail.ru',
    // }, {
    //     fullname: 'Siaofang Levitt',
    //     email: 'si.levitt@gmail.com',
    // }, {
    //     fullname: 'Chongan Fridman',
    //     email: 'y.fridman@gmail.com',
    // }];
    results: User[];

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        fromEvent(document.getElementById('searchInput'), 'input')
            .pipe(
                debounceTime(600),
                map(event => (event.target as HTMLInputElement).value),
                filter(value => value.length > 2),
                distinctUntilChanged(),
                switchMap(value => {
                    return from(this.usersService.findDeveloper(value))
                        .pipe(catchError(err => of ([])));
                }))
            .subscribe((results: User[]) => {
                this.results = results;
            });
    }
}