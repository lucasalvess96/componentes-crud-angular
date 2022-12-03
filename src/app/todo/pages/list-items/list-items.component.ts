import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { ComponentsPopupService } from '../../components/components-popup/components-popup.service';
import { ComponentsAlertsService } from '../../components/messages/messages-alert/components-alerts.service';
import { Items } from '../../models/items';
import { TodoService } from '../../service/todo.service';
import { CreateItemsComponent } from '../create-items/create-items.component';
import { DetailItemsComponent } from '../detail-items/detail-items.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
  items: Items[] = [];

  displayedColumns: string[] = ['id', 'name', 'price', 'online', 'actions'];
  dataSource!: MatTableDataSource<Items>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService,
    private confirmService: NgConfirmService,
    private componentsAlertsService: ComponentsAlertsService,
    private componentsPopupService: ComponentsPopupService
  ) {}

  ngOnInit(): void {
    this.onListItems();
  }

  onListItems(): void {
    this.todoService.listItems().subscribe({
      next: (res: Items[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(res)
      },
      error: () => this.componentsAlertsService.alertErrorRequest(),
    });
  }

  // https://www.youtube.com/watch?v=3tD6fKdxom0 -> pop delet
  onCreateItem(): void {
    this.dialog
      .open(CreateItemsComponent, {
        width: '35%',
      })
      .afterClosed()
      .subscribe((val: string) => {
        if (val === 'salvo') {
          this.onListItems();
        }
      });
  }

  onUpdateItem(item: Items): void {
    this.dialog
      .open(CreateItemsComponent, {
        width: '35%',
        data: item,
      })
      .afterClosed()
      .subscribe(val => {
        if (val === 'update') {
          this.onListItems();
        }
      });
  }

  onDetailItems(item: Items): void {
    this.dialog
      .open(DetailItemsComponent, {
        width: '35%',
        data: item,
      })
      .afterClosed()
      .subscribe(val => {
        if (val === 'detail') {
          this.onListItems();
        }
      });
  }

  onDeleteItems(item: Items): void {
    this.items = this.items.filter((id: Items) => id !== item);
    this.confirmService.showConfirm(
      'Deseja confirmar exlusão ?',
      () => {
        this.todoService.deleteItems(item).subscribe({
          next: () => {
            this.componentsAlertsService.alertSuccess();
            this.onListItems();
          },
          error: () => this.componentsAlertsService.alertErrorDeleteUser(),
        });
      },
      () => {}
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
