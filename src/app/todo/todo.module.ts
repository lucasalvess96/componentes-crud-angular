import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ListItemsComponent } from './list-items/list-items.component';
import { CreateItemsComponent } from './create-items/create-items.component';
import { DetailItemsComponent } from './detail-items/detail-items.component';

import { MaterialModule } from '../material-angular/material/material.module';
import { TodoRoutingModule } from './todo-routing.module';
import { NotFoundComponent } from '../not-found/not-found.component';

import { NgConfirmModule } from 'ng-confirm-box';

@NgModule({
  declarations: [
    ListItemsComponent,
    CreateItemsComponent,
    DetailItemsComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgConfirmModule,
    MaterialModule,
    HttpClientModule,
    TodoRoutingModule,
  ],
})
export class TodoModule {}
