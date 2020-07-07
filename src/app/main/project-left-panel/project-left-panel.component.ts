import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/interfaces';

@Component({
    selector: 'app-project-left-panel',
    templateUrl: './project-left-panel.component.html',
    styleUrls: ['./project-left-panel.component.less']
})
export class ProjectLeftPanelComponent implements OnInit {
    @Input() managersData: User[];
    @Input() developersData: User[];
    @Input() managersIds: string[];
    @Input() developersIds: string[];
    @Output() changeManagers: EventEmitter < [User[], string[]] > = new EventEmitter();
    @Output() changeDevelopers: EventEmitter < [User[], string[]] > = new EventEmitter();

    constructor() {}

    ngOnInit(): void {}

    removeManager(id: string) {
        for (const manager of this.managersData) {
            if (manager._id === id) {
                this.managersData.splice(this.managersData.indexOf(manager), 1);
                this.managersIds.splice(this.managersIds.indexOf(id), 1);
            }
        }
        this.changeManagers.emit([this.managersData, this.managersIds]);
    }

    removeDeveloper(id: string) {
        for (const dev of this.developersData) {
            if (dev._id === id) {
                this.developersData.splice(this.developersData.indexOf(dev), 1);
                this.developersIds.splice(this.developersIds.indexOf(id), 1);
            }
        }
        this.changeDevelopers.emit([this.developersData, this.developersIds]);
    }
}