import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemPedido } from '../models/itemPedido.models';

@Injectable({
  providedIn: 'root',
})
export class ItemPedidoService {
  private baseUrl = 'http://localhost:8080/itempedidos';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<ItemPedido[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }

    return this.httpClient.get<ItemPedido[]>(`${this.baseUrl}`, { params });
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: String): Observable<ItemPedido> {
    return this.httpClient.get<ItemPedido>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<ItemPedido[]> {
    return this.httpClient.get<ItemPedido[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  insert(itempedido: ItemPedido): Observable<ItemPedido> {
    return this.httpClient.post<ItemPedido>(this.baseUrl, itempedido);
  }

  update(itempedido: ItemPedido): Observable<ItemPedido> {
    return this.httpClient.put<ItemPedido>(
      `${this.baseUrl}/${itempedido.id}`,
      itempedido
    );
  }

  delete(itempedido: ItemPedido): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${itempedido.id}`);
  }
}
