import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users/users.service';
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
    userToAssign: User;
    form: FormGroup = new FormGroup({
        email: new FormControl('', [
            Validators.email
        ])
    });

    ngOnInit(): void {
        this.placeholder = `${this.userRole.toLowerCase()}@example.com`;
    }
    get email() {
        return this.form.get('email').value;
    }

    submit() {
        if (this.form.valid) {
            this.usersService
                .findUsers(this.email, this.userRole)
                .subscribe((users: User[]) => {
                        if (users.length > 1 || users.length === 0) {
                            this.form.controls.email.setErrors({ invalidEmail: true });
                            return;
                        }
                        this.userToAssign = users[0];
                        this.assignUser.emit(this.userToAssign);
                    },
                    () => this.form.controls.email.setErrors({ invalidEmail: true }));
        }
    }
}