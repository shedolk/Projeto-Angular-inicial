import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: string = 'http://localhost:8080/auth-usuario';
  private tokenKey = 'jwt_token';
  private usuarioLogadoKey = 'usuario_logado';

  private usuarioLogadoSubject = new BehaviorSubject<Usuario | null>(null);
  //private http: HttpClient;

  constructor(
    private handler: HttpBackend,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService
  ) {
    //this.http = new HttpClient(handler);
    this.initUsuarioLogado();
  }

  private initUsuarioLogado() {
    const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
    console.log('Inicializando usuário logado do localStorage:', usuario);
    if (usuario) {
      //const usuarioLogado = JSON.parse(usuario);

      // this.setUsuarioLogado(usuarioLogado);
      //this.usuarioLogadoSubject.next(usuarioLogado);

      this.setUsuarioLogado(usuario);
      this.usuarioLogadoSubject.next(usuario);
    }
  }

  //login(login: string, senha: string): Observable<any> {
  login(login: string, senha: string): Observable<any> {
    const params = {
      login: login,
      senha: senha,
      //perfil: 2, // user normal
    };

    //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.http
      .post(`${this.baseURL}`, params, { observe: 'response' })
      .pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization') ?? '';
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            // console.log(usuarioLogado);
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }
        })
      );
  }

  setUsuarioLogado(usuario: Usuario): void {
    console.log('Armazenando usuário logado no localStorage:', usuario);
    this.localStorageService.setItem(this.usuarioLogadoKey, usuario);
  }

  // setUsuarioLogado(usuario: Usuario): void {
  //   this.localStorageService.setItem(this.usuarioLogadoKey, JSON.stringify(usuario));
  // }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getUsuarioLogado() {
    return this.usuarioLogadoSubject.asObservable();
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  removeUsuarioLogado(): void {
    this.localStorageService.removeItem(this.usuarioLogadoKey);
    this.usuarioLogadoSubject.next(null);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    // Verifica se o token é nulo ou está expirado
    return !token || this.jwtHelper.isTokenExpired(token);
    // npm install @auth0/angular-jwt
  }

  getPerfilUsuario(): string {
    const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
    console.log('Recuperando perfil do usuário logado do localStorage:', usuario);
    //return usuario ? JSON.parse(usuario).perfil.label : '';
    return usuario ? usuario.perfil.label : '';
  }

  updateUsuarioLogado(usuario: Usuario): void {
    this.setUsuarioLogado(usuario);
  }
}
