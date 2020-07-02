import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() {}

    formatDateToString(date: Date): string {
        return date.toLocaleDateString('en-US');
    }

    formatDateString(dateString: string): string {
        dateString = dateString.replace(/[.\/]/g, '-');
        dateString = dateString
            .split('-')
            .reverse()
            .join('-');
        return dateString;
    }
}