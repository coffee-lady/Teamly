import { Component } from '@angular/core';
import { Validators, FormControl, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { UserValidator } from 'src/app/shared/validators/user-existing.validator';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.less', '../../shared/styles/auth.less']
})
export class RegisterComponent {

    constructor(private router: Router, private authService: AuthService, private userValidator: UserValidator) {}

    userForm: FormGroup = new FormGroup({
        fullname: new FormControl('', [Validators.required]),
        email: new FormControl('', { updateOn: 'blur' }, this.userValidator.validate),
        password: new FormControl('', [Validators.required, passwordValidator]),
        role: new FormControl('', [Validators.required]),
    });
    get fullname(): AbstractControl {
        return this.userForm.get('fullname');
    }

    get email(): AbstractControl {
        return this.userForm.get('email');
    }

    get password(): AbstractControl {
        return this.userForm.get('password');
    }

    get role(): AbstractControl {
        return this.userForm.get('role');
    }

    chooseRole(event: any) {
        this.userForm.controls.role.setValue(event.title);
    }

    roleTouched() {
        this.userForm.controls.role.markAsTouched();
    }

    register(): void {
        if (!this.userForm.valid) {
            return;
        }

        const { fullname, email, password, role } = this.userForm.getRawValue();

        this.authService.register(fullname, email, password, role).subscribe(response => {
            if (response.status !== 200) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Server Error Occurred.',
                });
                return;
            }

            this.router.navigateByUrl('/');
        });
    }
}