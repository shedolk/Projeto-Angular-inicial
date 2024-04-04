import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DadosTecnicos } from '../models/dadostecnicos.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadostecnicosService {
  private baseUrl = 'http://localhost:8080/dadostecnicos';

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<DadosTecnicos[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      };
    }
    return this.httpClient.get<DadosTecnicos[]>(`${this.baseUrl}`, { params });
  }

  findById(id: String): Observable<DadosTecnicos> {
    return this.httpClient.get<DadosTecnicos>(`${this.baseUrl}/${id}`);
  }

  insert(dadostecnicos: DadosTecnicos): Observable<DadosTecnicos> {
    return this.httpClient.post<DadosTecnicos>(this.baseUrl, dadostecnicos);
  }

  update(dadostecnicos: DadosTecnicos): Observable<DadosTecnicos> {
    const data = {
      compatibilidade: dadostecnicos.compatibilidade,
      tipoMola: dadostecnicos.tipoMola,
      tipoAmortecedor: dadostecnicos.tipoAmortecedor,
      fornecedor: dadostecnicos.fornecedor,
      embalagem: dadostecnicos.embalagem,
      peso: dadostecnicos.peso
    }
    return this.httpClient.put<DadosTecnicos>(`${this.baseUrl}/${dadostecnicos.id}`, data);
  }

  delete(dadostecnicos: DadosTecnicos): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${dadostecnicos.id}`);
  }
}
