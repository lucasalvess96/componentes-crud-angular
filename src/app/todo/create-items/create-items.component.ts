import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TodoService, Items } from '../todo.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css'],
})
export class CreateItemsComponent implements OnInit {
  formRegister!: UntypedFormGroup;
  actionBTN: string = 'adicionar';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<CreateItemsComponent>,
    @Inject(MAT_DIALOG_DATA) private editItem: Items | undefined
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

    // console.log(this.editItem);

    if (this.editItem) {
      this.actionBTN = 'alterar';

      this.formRegister.get('name')?.patchValue(this.editItem.name);
      this.formRegister.get('email')?.patchValue(this.editItem.email);
      this.formRegister.get('online')?.patchValue(this.editItem.online);
      this.formRegister.get('price')?.patchValue(this.editItem.price);
      this.formRegister
        .get('dataCriacao')
        ?.patchValue(this.editItem.dataCriacao);
    }
  }

  registerUser(): void {
    if (!this.editItem) {
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
    } else {
      this.updateUser();
    }
  }

  updateUser(): void {
    const editUser = this.formRegister?.value;
    editUser.id = this.editItem?.id;

    this.todoService.updateItem(editUser).subscribe({
      next: () => {
        alert('produto atualizado com sucesso');
        this.formRegister.reset();
        this.matDialogRef.close('update');
        console.log(editUser);
      },
      error: () => alert('erro ao atualizar produto'),
    });
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
