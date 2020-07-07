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
    const isDateString = /[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}/.test(value);
    const isDateInFuture = new Date(value) >= new Date();

    const isDueDateValid = isDateInFuture && isDateString;
    if (!isDueDateValid) {
        return { invalidDueDate: 'Due date is invalid.' };
    }
    return null;
}