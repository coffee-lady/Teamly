import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { User } from 'src/app/shared/interfaces';
import { fromEvent, from, of } from 'rxjs';
import { filter, debounceTime, map, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-developers-search',
    templateUrl: './developers-search.component.html',
    styleUrls: ['./developers-search.component.less']
})
export class DevelopersSearchComponent implements OnInit {
    @Output() goToUser: EventEmitter < string > = new EventEmitter();
    developers: User[];

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        fromEvent(document.getElementById('searchInput'), 'input')
            .pipe(
                debounceTime(600),
                map(event => (event.target as HTMLInputElement).value),
                filter(value => value.length > 2),
                distinctUntilChanged(),
                switchMap(searchStr => {
                    return this.usersService.findUsers(searchStr, 'developer').pipe(catchError(err => of ([])));
                }))
            .subscribe((developers: User[]) => {
                this.developers = developers;
            });
    }

    linkOnClick(devId: string) {
        this.goToUser.emit(devId);
    }
}