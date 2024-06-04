import { Usuario } from './../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endereco } from '../models/endereco.models';
import { Telefone } from '../models/telefone.models';

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

  findByLogin(login: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/search/login/${login}`);
  }

  insert(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(
      `${this.baseUrl}/${usuario.id}`,
      usuario
    );
  }

  delete(usuario: Usuario): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`);
  }

  // findTelefonesByUsuarioLogin(login: string): Observable<Telefone[]> {
  //   return this.httpClient.get<Telefone[]>(`${this.baseUrl}/login/${login}/telefones`);
  // }

  // findEnderecosByUsuarioLogin(login: string): Observable<Endereco[]> {
  //   return this.httpClient.get<Endereco[]>(`${this.baseUrl}/login/${login}/enderecos`);
  // }
}
