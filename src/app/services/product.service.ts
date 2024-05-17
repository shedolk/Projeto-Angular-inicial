import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/produtos';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Product[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }

    return this.httpClient.get<Product[]>(`${this.baseUrl}`, { params });
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: String): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  insert(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product);
  }

  update(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      `${this.baseUrl}/${product.id}`,
      product
    );
  }

  delete(product: Product): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${product.id}`);
  }
}
