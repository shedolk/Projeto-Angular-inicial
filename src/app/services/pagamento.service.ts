import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/pagamento.models';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  private baseUrl = 'http://localhost:8080/pagamentos';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Pagamento[]> {
    return this.httpClient.get<Pagamento[]>(this.baseUrl);
  }

  findById(id: String): Observable<Pagamento> {
    return this.httpClient.get<Pagamento>(`${this.baseUrl}/${id}`);
  }

  insert(pagamento: Pagamento): Observable<Pagamento> {
    return this.httpClient.post<Pagamento>(this.baseUrl, pagamento);
  }

  update(pagamento: Pagamento): Observable<Pagamento> {
    return this.httpClient.put<Pagamento>(
      `${this.baseUrl}/${pagamento.id}`,
      pagamento
    );
  }

  delete(pagamento: Pagamento): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${pagamento.id}`);
  }
}
