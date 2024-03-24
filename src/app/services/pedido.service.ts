import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.models';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private baseUrl = 'http://localhost:8080/pedidos';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(this.baseUrl);
  }

  findById(id: String): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  insert(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.baseUrl, pedido);
  }

  update(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.id}`, pedido);
  }

  delete(pedido: Pedido): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${pedido.id}`);
  }
}
