import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ListItemsComponent } from './list-items/list-items.component';
import { CreateItemsComponent } from './create-items/create-items.component';
import { DetailItemsComponent } from './detail-items/detail-items.component';
import { UpdateItemsComponent } from './update-items/update-items.component';

import { MaterialModule } from '../material-angular/material/material.module';
import { TodoRoutingModule } from './todo-routing.module';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CreateFormItemsComponent } from './create-form-items/create-form-items.component';

@NgModule({
  declarations: [
    ListItemsComponent,
    CreateItemsComponent,
    DetailItemsComponent,
    UpdateItemsComponent,
    NotFoundComponent,
    CreateFormItemsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    TodoRoutingModule,
  ],
})
export class TodoModule {}
