import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgConfirmModule } from 'ng-confirm-box';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from '../page-erro/not-found.component';
import { MaterialAngularModule } from '../shared/material-angular/material-angular.module';
import { CreateItemsComponent } from './pages/create-items/create-items.component';
import { DetailItemsComponent } from './pages/detail-items/detail-items.component';
import { ListItemsComponent } from './pages/list-items/list-items.component';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [
    ListItemsComponent,
    CreateItemsComponent,
    DetailItemsComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgConfirmModule,
    MaterialAngularModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    TodoRoutingModule,
  ],
})
export class TodoModule {}
