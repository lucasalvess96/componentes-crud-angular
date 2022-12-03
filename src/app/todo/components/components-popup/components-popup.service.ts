import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Items } from 'src/app/todo/models/items';
import { CreateItemsComponent } from 'src/app/todo/pages/create-items/create-items.component';
import { DetailItemsComponent } from 'src/app/todo/pages/detail-items/detail-items.component';
import { TodoService } from 'src/app/todo/service/todo.service';
import { ComponentsAlertsService } from '../messages/messages-alert/components-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentsPopupService {
  items: Items[] = [];

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private confirmService: NgConfirmService,
    // private listItemsComponent: ListItemsComponent,
    private cmponentsAlertsService: ComponentsAlertsService
  ) {}

  dialogCreateItem(): void {
    this.dialog
      .open(CreateItemsComponent, {
        width: '35%',
      })
      .afterClosed()
      .subscribe((val: string) => {
        if (val === 'salvo') {
          // this.listItemsComponent.onListItems();
        }
      });
  }

  dialogUpdateItem(item: Items): void {
    this.dialog
      .open(CreateItemsComponent, {
        width: '35%',
        data: item,
      })
      .afterClosed()
      .subscribe(val => {
        if (val === 'update') {
          // this.listItemsComponent.onListItems();
        }
      });
  }

  dialogDetailItems(item: Items): void {
    this.dialog
      .open(DetailItemsComponent, {
        width: '35%',
        data: item,
      })
      .afterClosed()
      .subscribe(val => {
        if (val === 'detail') {
          // this.listItemsComponent.onListItems();
        }
      });
  }

  dialogDeleteItems(item: Items): void {
    this.items = this.items.filter((id: Items) => id !== item);
    this.confirmService.showConfirm(
      'Deseja confirmar exlusão ?',
      () => {
        this.todoService.deleteItems(item).subscribe({
          next: () => {
            this.cmponentsAlertsService.alertSuccess();
            // this.listItemsComponent.onListItems();
          },
          error: () => this.cmponentsAlertsService.alertErrorDeleteUser(),
        });
      },
      () => {}
    );
  }
}
