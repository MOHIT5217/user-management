import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DataService } from './data.service';
import {MenubarModule} from 'primeng/menubar';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from './card/card.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MenubarModule,
    ButtonModule,
    TableModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    ConfirmDialogModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    CardComponent
  ],
  providers: [
    DataService,
    ConfirmationService,
    MessageService
  ]
})
export class SharedModule { }
