import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Items, TodoService } from '../todo.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form-items',
  templateUrl: './create-form-items.component.html',
  styleUrls: ['./create-form-items.component.css'],
})
export class CreateFormItemsComponent implements OnInit {
  formRegister!: FormGroup;
  // dataForm: Items[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<CreateFormItemsComponent>
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

  // onAddItems(): void {
  //   if (this.formRegister.valid) {
  //     this.dataForm = this.formRegister.value;

  //     console.table(this.dataForm);

  //     alert('success!');
  //   }
  // }

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
