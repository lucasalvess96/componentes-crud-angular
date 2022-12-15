import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentsAlertsService } from '../../components/messages/messages-alert/components-alerts.service';
import { Items } from '../../models/items';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-delete-items',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.css'],
})
export class DeleteItemsComponent implements OnInit {
  items: Items[] = [];

  constructor(
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<DeleteItemsComponent>,
    private componentsAlertsService: ComponentsAlertsService,
    @Inject(MAT_DIALOG_DATA) public data: Items
  ) {}

  ngOnInit(): void {}

  deleteItems(item: Items): void {
    this.todoService.deleteItems(item.id).subscribe({
      next: () => {
        this.componentsAlertsService.alertSuccess();
        this.matDialogRef.close('delete');
      },
      error: () => this.componentsAlertsService.alertErrorDeleteUser(),
    });
  }
}
