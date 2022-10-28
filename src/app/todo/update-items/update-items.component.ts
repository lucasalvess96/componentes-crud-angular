import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.css'],
})
export class UpdateItemsComponent implements OnInit {
  formRegister!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<UpdateItemsComponent>
  ) {}

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('^([A-Za-z]+[A-Za-z ])*$'),
          Validators.maxLength(40),
          Validators.minLength(3),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      online: [
        '',
        [
          Validators.required,
          Validators.pattern('^([A-Za-z]+[A-Za-z ])*$'),
          Validators.pattern(/(sim|nao)/g),
          Validators.minLength(3),
          Validators.maxLength(3),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]\d*$/),
          Validators.minLength(1),
        ],
      ],
      dataCriacao: ['', [Validators.required]],
    });
  }

  registerUser(): void {
    if (this.formRegister.valid) {
      this.todoService.addItems(this.formRegister.value).subscribe({
        next: () => {
          alert('produto adicionado!');
          this.formRegister.reset();
          this.matDialogRef.close('salvo');
        },
        error: () => alert('erro ao adicionar produto.'),
      });
    }
  }

  get handleName() {
    return this.formRegister.get('name')!;
  }

  get handleOnline() {
    return this.formRegister.get('online')!;
  }

  get handleEmail() {
    return this.formRegister.get('email')!;
  }
}
