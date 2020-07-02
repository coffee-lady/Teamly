import { FormControl, ValidationErrors } from '@angular/forms';

function formatDateString(dateString: string): string {
    dateString = dateString.replace(/[.\/]/g, '-');
    dateString = dateString
        .split('-')
        .reverse()
        .join('-');
    return dateString;
}

export function dueDateValidator(control: FormControl): ValidationErrors {
    const value = formatDateString(control.value);
    const isDateString = /[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}-/.test(value);
    const isDateValid = formatDateString(new Date(value).toLocaleDateString('en-US')) === value;
    const isDateInFuture = new Date(value) >= new Date();

    const isDueDateValid = isDateValid && isDateInFuture && isDateString;
    if (!isDueDateValid) {
        return { invalidDueDate: 'Due date is invalid.' };
    }
    return null;
}