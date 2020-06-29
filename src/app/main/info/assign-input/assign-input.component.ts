import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-assign-input',
    templateUrl: './assign-input.component.html',
    styleUrls: ['./assign-input.component.less']
})

export class AssignInputComponent implements OnInit {

    constructor() {}
    @Input() infoAbout: string;
    @Input() titleFor: string;
    @Output() checkEmail: EventEmitter < string > = new EventEmitter();

    placeholder: string;
    ManagerForm: FormGroup;

    ngOnInit(): void {
        this.ManagerForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email
            ])
        });
        this.placeholder = `${this.titleFor}@example.com`;
    }

    get email() {
        return this.ManagerForm.get('email');
    }

    submit() {
        this.checkEmail.emit(this.email.value);
    }
}