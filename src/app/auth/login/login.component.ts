import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less', '../../shared/styles/auth.less']
})
export class LoginComponent {

    userForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, passwordValidator]),
    });

    get email(): AbstractControl {
        return this.userForm.get('email');
    }

    get password(): AbstractControl {
        return this.userForm.get('password');
    }

    constructor(private router: Router, private authService: AuthService) {}

    login(): void {
        if (this.userForm.invalid) {
            return;
        }

        const { email, password } = this.userForm.getRawValue();
        this.authService.login(email, password).subscribe(response => {
            if (response.status !== 200) {
                this.userForm.controls.email.setErrors({ email: true });
                return;
            }

            this.router.navigateByUrl('/');
        });
    }
}