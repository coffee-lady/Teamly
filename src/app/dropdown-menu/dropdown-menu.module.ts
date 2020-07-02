import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';



@NgModule({
    declarations: [DropdownMenuComponent],
    imports: [
        CommonModule
    ],
    exports: [DropdownMenuComponent]
})
export class DropdownMenuModule {}