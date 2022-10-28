import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService, Items } from '../todo.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-form-items',
  templateUrl: './create-form-items.component.html',
  styleUrls: ['./create-form-items.component.css'],
})
export class CreateFormItemsComponent implements OnInit {
  formRegister!: FormGroup;
  actionBTN: string = 'adicionar';

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<CreateFormItemsComponent>,
    @Inject(MAT_DIALOG_DATA) private editItem: Items
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

    if (this.editItem) {
      this.actionBTN = 'alterar';

      this.formRegister.controls['name'].setValue(this.editItem.name);
      this.formRegister.controls['email'].setValue(this.editItem.email);
      this.formRegister.controls['online'].setValue(this.editItem.online);
      this.formRegister.controls['price'].setValue(this.editItem.price);
    }
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
