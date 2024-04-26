import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil.models';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private baseUrl = 'http://localhost:8080/perfils';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(this.baseUrl);
  }
}
