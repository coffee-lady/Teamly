import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-dropdown-menu',
    templateUrl: './dropdown-menu.component.html',
    styleUrls: ['./dropdown-menu.component.less']
})
export class DropdownMenuComponent implements OnInit {
    @Input() dataToSelect: string[];
    @Input() title: string;
    @Output() elemChoosed = new EventEmitter < string > ();

    choose(elem: string) {
        this.elemChoosed.emit(elem);
    }

    constructor() {}

    ngOnInit(): void {
        $('.dropdown').on('click', function() {
            $(this).attr('tabindex', 1).trigger('focus');
            $(this).toggleClass('active');
            $(this).find('.dropdown-menu').slideToggle(300);
        });
        $('.dropdown').on('focusout', function() {
            $(this).removeClass('active');
            $(this).find('.dropdown-menu').slideUp(300);
        });
        $('body').on('click', '.dropdown-menu li', function() {
            $('.dropdown').find('.result').text($(this).text());
        });
    }

}