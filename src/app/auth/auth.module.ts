import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownMenuModule } from '../dropdown-menu/dropdown-menu.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ng2-tooltip-directive';
import { HttpClientModule } from '@angular/common/http';
import { UserValidator } from '../shared/validators/user-existing.validator';
import { UsersService } from '../shared/services';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownMenuModule,
        TooltipModule,
        HttpClientModule,
    ],
    providers: []
})
export class AuthModule {}