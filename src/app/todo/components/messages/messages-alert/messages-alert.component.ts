import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-messages-alert',
  templateUrl: './messages-alert.component.html',
  styleUrls: ['./messages-alert.component.css'],
})
export class MessagesAlertComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {}

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
