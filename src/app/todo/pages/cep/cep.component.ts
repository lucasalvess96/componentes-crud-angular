import { Component, OnInit } from '@angular/core';
import { Cep } from '../../models/cep';
import { CepService } from '../../service/cep/cep.service';
@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.css'],
})
export class CepComponent implements OnInit {
  cep: any;
  logradouro: any;
  localidade: any;
  bairro: any;
  uf: any;
  ddd: any;

  constructor(private cepService: CepService) {}

  ngOnInit(): void {}

  buscarCEP(): void {
    this.cepService.getCEP(this.cep).subscribe((data: Cep) => {
      this.cep = data.cep;
      this.logradouro = data.logradouro;
      this.localidade = data.localidade;
      this.bairro = data.bairro;
      this.uf = data.uf;
      this.ddd = data.ddd;

      console.log(this.bairro);
    });
  }

  verificarCep(event: any): void {
    this.buscarCEP();
  }

  // blur(event: any) {
  //   this.buscaCEP();
  // }
}
