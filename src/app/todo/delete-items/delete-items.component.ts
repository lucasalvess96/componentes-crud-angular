import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Items, TodoService } from '../todo.service';

@Component({
  selector: 'app-delete-items',
  templateUrl: './delete-items.component.html',
  styleUrls: ['./delete-items.component.css'],
})
export class DeleteItemsComponent implements OnInit {
  items: Items[] = [];
  @Output() deleted = new EventEmitter<Items>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onDeleteItems(item: Items): void {
    this.items = this.items.filter(i => i !== item);

    this.todoService.deleteItems(item.id).subscribe({
      next: () => alert('produto deletado!'),
      error: () => alert('erro ao deletar produto'),
    });
  }

  test(): void {
    alert('it works');
  }
}
