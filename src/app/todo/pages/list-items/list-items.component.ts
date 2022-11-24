import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgConfirmService } from 'ng-confirm-box';
import { NgxBootstrapConfirmService } from 'ngx-bootstrap-confirm';
import { ToastrService } from 'ngx-toastr';
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
    private todoService: TodoService,
    private dialog: MatDialog,
    private confirmService: NgConfirmService,
    private ngxBootstrapConfirmService: NgxBootstrapConfirmService,
    private toastr: ToastrService
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
            this.alertSuccess(), this.onListItems();
          },
          error: () => alert('erro ao deleter usuário'),
        });
      },
      () => {}
    );
  }

  onDeleteItemss(item: Items): void {
    this.items = this.items.filter((id: Items) => id !== item);
    this.confirmService.showConfirm(
      'Deseja confirmar exlusão ?',
      () => {
        this.todoService.deleteItems(item).subscribe({
          next: () => {
            this.alertSuccess(), this.onListItems();
          },
          error: () => alert('erro ao deleter usuário'),
        });
      },
      () => {}
    );
  }

  action() {
    let options = {
      title: 'Confirmar exclusão do usuario ?',
      confirmLabel: 'Sim',
      declineLabel: 'Não',
    };
    this.ngxBootstrapConfirmService.confirm(options).then((res: boolean) => {
      if (res) {
        console.log('Sim');
      } else {
        console.log('Não');
      }
    });
  }

  alertSuccess(): void {
    this.toastr.success('Item deletado com sucesso');
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
