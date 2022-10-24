import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CreateFormItemsComponent } from '../create-form-items/create-form-items.component';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css'],
})
export class CreateItemsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(CreateFormItemsComponent, {
      data: {
        width: '30%',
      },
    });
  }
}
