import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Items } from '../todo.service';

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls: ['./detail-items.component.css'],
})
export class DetailItemsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Items) {}

  ngOnInit(): void {}
}
