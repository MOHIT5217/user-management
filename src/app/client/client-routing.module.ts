import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component';

const routes:Routes = [
  {path:'', component: ClientListComponent},
  {path:'user_detail/:id', component: ClientDetailsComponent},
  {path:'add_user', component: ClientAddComponent},
  {path:'edit_user/:id', component: ClientEditComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
