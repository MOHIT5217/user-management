import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from '../shared/shared.module';
import {CardModule} from 'primeng/card';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientAddComponent } from './client-add/client-add.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientDetailsComponent,
    ClientEditComponent,
    ClientAddComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    CardModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    MatSnackBarModule,
  ]
})
export class ClientModule { }
