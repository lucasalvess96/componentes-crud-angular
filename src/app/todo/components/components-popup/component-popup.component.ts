import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { Items } from 'src/app/todo/models/items';
import { ListItemsComponent } from 'src/app/todo/pages/list-items/list-items.component';
import { TodoService } from 'src/app/todo/service/todo.service';
import { MessagesAlertComponent } from '../messages/messages-alert/messages-alert.component';

@Component({
  selector: 'app-component-popup',
  templateUrl: './component-popup.component.html',
  styleUrls: ['./component-popup.component.css'],
})
export class ComponentPopupComponent implements OnInit {
  items: Items[] = [];

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private confirmService: NgConfirmService,
    private listItemsComponent: ListItemsComponent,
    private messagesAlertComponent: MessagesAlertComponent
  ) {}

  ngOnInit(): void {}

  // dialogCreateItem(): void {
  //   this.dialog
  //     .open(CreateItemsComponent, {
  //       width: '35%',
  //     })
  //     .afterClosed()
  //     .subscribe((val: string) => {
  //       if (val === 'salvo') {
  //         this.listItemsComponent.onListItems();
  //       }
  //     });
  // }

  // dialogUpdateItem(item: Items): void {
  //   this.dialog
  //     .open(CreateItemsComponent, {
  //       width: '35%',
  //       data: item,
  //     })
  //     .afterClosed()
  //     .subscribe(val => {
  //       if (val === 'update') {
  //         this.listItemsComponent.onListItems();
  //       }
  //     });
  // }
  // dialogDetailItems(item: Items): void {
  //   this.dialog
  //     .open(DetailItemsComponent, {
  //       width: '35%',
  //       data: item,
  //     })
  //     .afterClosed()
  //     .subscribe(val => {
  //       if (val === 'detail') {
  //         this.listItemsComponent.onListItems();
  //       }
  //     });
  // }

  // dialogDeleteItems(item: Items): void {
  //   this.items = this.items.filter((id: Items) => id !== item);
  //   this.confirmService.showConfirm(
  //     'Deseja confirmar exlusão ?',
  //     () => {
  //       this.todoService.deleteItems(item).subscribe({
  //         next: () => {
  //           this.messagesAlertComponent.alertSuccess(),
  //             this.listItemsComponent.onListItems();
  //         },
  //         error: () => this.messagesAlertComponent.alertErrorDeleteUser(),
  //       });
  //     },
  //     () => {}
  //   );
  // }
}
