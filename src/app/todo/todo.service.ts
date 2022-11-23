import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

export interface Items {
  id: number;
  email: string;
  name: string;
  price: number;
  online: boolean;
  dataCriacao: Date;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseURL: string = 'http://localhost:3000/items';

  constructor(private http: HttpClient) {}

  listItems(): Observable<Items[]> {
    return this.http
      .get<Items[]>(this.baseURL)
      .pipe(retry(2), catchError(this.configErroApi));
  }

  addItems(items: Items): Observable<Items> {
    return this.http
      .post<Items>(this.baseURL, items, httpOptions)
      .pipe(catchError(this.configErroApi));
  }

  updateItem(item: Items): Observable<Items> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'my-auth-token'
    );

    return this.http
      .put<Items>(`${this.baseURL}/${item.id}`, item, httpOptions)
      .pipe(catchError(this.configErroApi));
  }

  deleteItems(item: Items): Observable<unknown> {
    const url: string = `${this.baseURL}/${item.id}`;
    return this.http.delete(url).pipe(catchError(this.configErroApi));
  }

  private configErroApi(erro: HttpErrorResponse): Observable<never> {
    if (erro.status === 0) {
      console.log(`Um erro ocorreu na requisição ${erro.error}`);
    } else {
      console.log(
        `O back-end retornou código: ${erro.status}, Body era: ${erro.error}`
      );
    }

    return throwError(
      () =>
        new Error('Algo ruím aconteceu; por favor, tente novamente mais tarde.')
    );
  }
}
