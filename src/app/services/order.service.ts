import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/itemcarrinho.models';
import { Observable, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Order } from '../models/order.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL: string =  'http://localhost:8080/orders';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // save(carrinho: ItemCarrinho[] ): Observable<Order> {
  //   const itens = carrinho.map(item => ({
  //     quantidade: item.quantidade,
  //     preco: item.preco,
  //     idProduct: item.id
  //   }));

  //   const produtos = {
  //     itens: itens
  //   };

  //   return this.http.post<any>(`${this.baseURL}/orders`, produtos);
  // }

  findAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}`);
  }

  getTotalPedidos(): Observable<number> {
    return this.findAll().pipe(map(pedidos => pedidos.length));
  }

  save(carrinho: ItemCarrinho[]): Observable<Order> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idProduct: item.id
    }));

    const produtos = {itens: itens};

    return this.http.post<Order>(`${this.baseURL}`, produtos);
  }

  // getPedidosPorUsuario(login: string): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}/user/${login}`);
  // }

  getPedidosPorUsuario(idUsuario: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseURL}/user/${idUsuario}`);
  }

  // getPedidosPorUsuario(login: string): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}?login=${login}`);
  // }

  // getPedidosPorUsuario(): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseURL}`);
  // }

  getPedidoById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseURL}/${id}`);
  }
}
