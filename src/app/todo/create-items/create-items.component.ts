import { Component, OnInit } from '@angular/core';
import { ListItemsComponent } from '../list-items/list-items.component';

import { MatDialog } from '@angular/material/dialog';
import { CreateFormItemsComponent } from '../create-form-items/create-form-items.component';


@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css'],
})
export class CreateItemsComponent implements OnInit {
  constructor(private dialog: MatDialog, private listItemsComponent: ListItemsComponent) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog
      .open(CreateFormItemsComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val: string) => {
        if (val === 'salvo') {
          this.listItemsComponent.onListItems();
        }
      });
  }
}
