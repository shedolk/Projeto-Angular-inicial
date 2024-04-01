import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.models';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080/categories';

  constructor(private httpClient: HttpClient) {}

  findAll(page?: number, pageSize?: number): Observable<Category[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }
    return this.httpClient.get<Category[]>(`${this.baseUrl}`, { params });
  }

  findById(id: String): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}/${id}`);
  }

  insert(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl, category);
  }

  update(category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${this.baseUrl}/${category.id}`,
      category
    );
  }

  delete(category: Category): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${category.id}`);
  }
}
