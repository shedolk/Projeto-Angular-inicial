import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemCarrinho } from '../models/itemcarrinho.models';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Order } from '../models/order.models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) { }

  save(carrinho: ItemCarrinho[] ): Observable<Order> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idProduct: item.id
    }));

    const produtos = {
      itens: itens
    };

    return this.http.post<any>(`${this.baseURL}/orders`, produtos);
  }
}
