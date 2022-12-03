import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../../models/cep';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getCEP(cep: Cep): Observable<Cep> {
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
