import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { fromEvent, from } from 'rxjs';
import { debounceTime, map, filter, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-assign-input',
    templateUrl: './assign-input.component.html',
    styleUrls: ['./assign-input.component.less']
})

export class AssignInputComponent implements OnInit {

    constructor(private usersService: UsersService) {}
    @Input() assignUserTo: string;
    @Input() userRole: string;
    @Output() assignUser: EventEmitter < User > = new EventEmitter();

    placeholder: string;
    form: FormGroup;
    emailIncorrect = false;
    userToAssign: User;

    ngOnInit(): void {
        this.form = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ])
        });
        this.placeholder = `${this.userRole}@example.com`;


        fromEvent(document.getElementById('input'), 'input').pipe(
            debounceTime(700),
            map(event => (event.target as HTMLInputElement).value),
            filter(email => email.length > 3),
            distinctUntilChanged(),
            mergeMap(email => this.usersService.findUsers(this.email, this.userRole))
        ).subscribe({
            next: (users: User[]) => {
                if (!users || users.length > 1) {
                    this.emailIncorrect = true;
                    return;
                }
                this.emailIncorrect = false;
                this.userToAssign = users[0];
            },
            error: console.error
        });
    }

    get email() {
        return this.form.get('email').value;
    }

    submit() {
        if (!this.emailIncorrect && this.userToAssign) {
            this.assignUser.emit(this.userToAssign);
        }
    }
}