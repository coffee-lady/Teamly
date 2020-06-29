import { Component } from '@angular/core';
import { Validators, FormControl, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less', '../../shared/styles/auth.less', '../../shared/styles/dropdown.less']
})
export class RegisterComponent {
    constructor(private router: Router, private authService: AuthService) {}

    get fullname(): AbstractControl {
        return this.userForm.get('fullname');
    }

    get email(): AbstractControl {
        return this.userForm.get('email');
    }

    get password(): AbstractControl {
        return this.userForm.get('password');
    }
    userForm = new FormGroup({
        fullname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    register(): void {
        if (this.userForm.invalid) {
            return;
        }

        const { fullname, email, password } = this.userForm.getRawValue();

        this.authService.register(fullname, email, password).subscribe(data => {
            this.router.navigate(['']);
        });
    }
}