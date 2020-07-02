import { FormControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: FormControl): ValidationErrors {
    const value = control.value;
    const hasNumber = /[0-9]/.test(value);
    const hasLetters = /[A-Za-z]/.test(value);
    const isLengthValid = value ? value.length > 7 : false;

    const passwordValid = hasNumber && hasLetters && isLengthValid;

    if (!passwordValid) {
        return { invalidPassword: 'Password is invalid.' };
    }
    return null;
}