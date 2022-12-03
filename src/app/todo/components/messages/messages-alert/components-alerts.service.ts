import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ComponentsAlertsService {
  constructor(private toastr: ToastrService) {}

  alertSuccess(): void {
    this.toastr.success('Item deletado com sucesso');
  }

  alertErrorDeleteUser(): void {
    this.toastr.error('Error ao deletar usuário');
  }

  alertErrorRequest(): void {
    this.toastr.error('Error ao fazer requisicao');
  }
}
