import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaPagamento } from '../models/formaPagamento.models';

@Injectable({
  providedIn: 'root',
})
export class FormaPagamentoService {
  private baseUrl = 'http://localhost:8080/formapagamentos';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<FormaPagamento[]> {
    return this.httpClient.get<FormaPagamento[]>(this.baseUrl);
  }

  findById(id: String): Observable<FormaPagamento> {
    return this.httpClient.get<FormaPagamento>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<FormaPagamento[]> {
    return this.httpClient.get<FormaPagamento[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  insert(formapagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.httpClient.post<FormaPagamento>(this.baseUrl, formapagamento);
  }

  update(formapagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.httpClient.put<FormaPagamento>(
      `${this.baseUrl}/${formapagamento.id}`,
      formapagamento
    );
  }

  delete(formapagamento: FormaPagamento): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${formapagamento.id}`);
  }
}
