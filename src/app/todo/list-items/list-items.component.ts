import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateItemsComponent } from '../create-items/create-items.component';
import { TodoService, Items } from '../todo.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.onListItems();
  }

  onListItems(): void {
    this.todoService.listItems().subscribe({
      // nex: res => console.log(res),
      next: (res: Items[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert('erro ao fazer a requisição'),
    });
  }

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

  onDeleteItems(item: Items): void {
    this.items = this.items.filter((id: Items) => id !== item);

    if (confirm('are you sure ?')) {
      this.todoService.deleteItems(item).subscribe({
        next: () => {
          alert('produto deletado'), this.onListItems();
        },
        error: () => alert('erro ao deleter usuário'),
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
