import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { UsersService } from '../services';
import { AbstractControl, ValidationErrors, AsyncValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserValidator implements AsyncValidator {

    constructor(private usersService: UsersService) {}

    validate(
        control: AbstractControl
    ): Promise < ValidationErrors | null > | Observable < ValidationErrors | null > {
        return this.usersService.findUsers(control.value, '')
            .pipe(
                map((users: User[]) => users ? { invalidEmail: 'Password is invalid.' } : null)
            );
    }
}