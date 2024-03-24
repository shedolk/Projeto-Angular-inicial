import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusPedido } from '../models/statusPedido.models';

@Injectable({
  providedIn: 'root',
})
export class StatusPedidoService {
  private baseUrl = 'http://localhost:8080/statuspedidos';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<StatusPedido[]> {
    return this.httpClient.get<StatusPedido[]>(this.baseUrl);
  }

  findById(id: String): Observable<StatusPedido> {
    return this.httpClient.get<StatusPedido>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<StatusPedido[]> {
    return this.httpClient.get<StatusPedido[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  insert(statuspedido: StatusPedido): Observable<StatusPedido> {
    return this.httpClient.post<StatusPedido>(this.baseUrl, statuspedido);
  }

  update(statuspedido: StatusPedido): Observable<StatusPedido> {
    return this.httpClient.put<StatusPedido>(
      `${this.baseUrl}/${statuspedido.id}`,
      statuspedido
    );
  }

  delete(statuspedido: StatusPedido): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${statuspedido.id}`);
  }
}
