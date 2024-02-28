import { Usuario } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.baseUrl);
  }

  findById(id: String): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  insert(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.baseUrl}/${usuario}`, usuario);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`);
  }
}
