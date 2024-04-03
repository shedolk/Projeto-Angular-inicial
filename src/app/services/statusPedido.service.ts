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
}
