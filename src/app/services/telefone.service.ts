import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from '../models/telefone.models';

@Injectable({
  providedIn: 'root',
})
export class TelefoneService {
  private baseUrl = 'http://localhost:8080/telefones';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(this.baseUrl);
  }

  findById(id: String): Observable<Telefone> {
    return this.httpClient.get<Telefone>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(
      `${this.baseUrl}/usuario/${idUsuario}`
    );
  }

  // insert(telefone: Telefone): Observable<Telefone> {
  //   return this.httpClient.post<Telefone>(`${this.baseUrl}/usuario`, telefone);
  // }

  insert(telefone: Telefone, idUsuario: string): Observable<Telefone> {
    return this.httpClient.post<Telefone>(`${this.baseUrl}/usuario/${idUsuario}`, telefone);
  }

  update(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.put<Telefone>(
      `${this.baseUrl}/${telefone.id}`,
      telefone
    );
  }

  delete(telefone: Telefone): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${telefone.id}`);
  }
}
