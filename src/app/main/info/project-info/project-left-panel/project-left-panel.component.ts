import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-project-left-panel',
    templateUrl: './project-left-panel.component.html',
    styleUrls: ['./project-left-panel.component.less']
})
export class ProjectLeftPanelComponent implements OnInit {
    @Input() managers: User[];
    @Input() developers: User[];
    constructor() {}

    ngOnInit(): void {}

}