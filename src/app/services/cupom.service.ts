import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cupom } from '../models/cupom.models';

@Injectable({
  providedIn: 'root',
})
export class CupomService {
  private baseUrl = 'http://localhost:8080/cupom';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Cupom[]> {
    return this.httpClient.get<Cupom[]>(this.baseUrl);
  }

  findById(id: String): Observable<Cupom> {
    return this.httpClient.get<Cupom>(`${this.baseUrl}/${id}`);
  }

  findByIdUsuario(idUsuario: String): Observable<Cupom[]> {
    return this.httpClient.get<Cupom[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  insert(cupom: Cupom): Observable<Cupom> {
    return this.httpClient.post<Cupom>(this.baseUrl, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    return this.httpClient.put<Cupom>(`${this.baseUrl}/${cupom.id}`, cupom);
  }

  delete(cupom: Cupom): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cupom.id}`);
  }
}
