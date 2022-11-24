import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Items } from '../../models/items';
import { TodoService } from '../../service/todo.service';

@Component({
  selector: 'app-create-items',
  templateUrl: './create-items.component.html',
  styleUrls: ['./create-items.component.css'],
})
export class CreateItemsComponent implements OnInit {
  formRegister!: FormGroup;
  actionBTN: string = 'adicionar';

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    private matDialogRef: MatDialogRef<CreateItemsComponent>,
    @Inject(MAT_DIALOG_DATA) private editItem: Items | undefined,
    private toastr: ToastrService
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

  alertSuccess(): void {
    this.toastr.success('Item cadastrado com sucesso');
  }

  alertSuccessEdit(): void {
    this.toastr.success('Item editado com sucesso');
  }

  registerUser(): void {
    if (!this.editItem) {
      if (this.formRegister.valid) {
        this.todoService.addItems(this.formRegister.value).subscribe({
          next: () => {
            this.alertSuccess();
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
        this.alertSuccessEdit();
        this.formRegister.reset();
        this.matDialogRef.close('update');
        // console.log(editUser);
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
