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

  findAll(): Observable<ItemPedido[]> {
    return this.httpClient.get<ItemPedido[]>(this.baseUrl);
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
