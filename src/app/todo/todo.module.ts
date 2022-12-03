import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgConfirmModule } from 'ng-confirm-box';
import { NgxBootstrapConfirmModule } from 'ngx-bootstrap-confirm';
import { ToastrModule } from 'ngx-toastr';
import { NotFoundComponent } from '../page-erro/not-found.component';
import { MaterialAngularModule } from '../shared/material-angular/material-angular.module';
import { ComponentPopupComponent } from './components/components-popup/component-popup.component';
import { MessagesAlertComponent } from './components/messages/messages-alert/messages-alert.component';
import { CepComponent } from './pages/cep/cep.component';
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
    ComponentPopupComponent,
    MessagesAlertComponent,
    CepComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgConfirmModule,
    MaterialAngularModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxBootstrapConfirmModule,
    TodoRoutingModule,
  ],
  providers: [],
})
export class TodoModule {}
