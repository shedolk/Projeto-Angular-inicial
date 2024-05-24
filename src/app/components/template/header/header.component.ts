import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SidebarService } from '../../../services/sidebar.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatBadge } from '@angular/material/badge';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatBadge,
    MatButton,
    MatIconButton,
    RouterModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  qtdItensCarrinho: number = 0;
  @Input() tipo: number = 0;

  constructor(
    private sidebarService: SidebarService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obterQtdItensCarrinho();
    this.obterUsuarioLogado();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickMenu() {
    this.sidebarService.toggle();
  }

  obterQtdItensCarrinho() {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.qtdItensCarrinho = itens.length;
    });
  }

  obterUsuarioLogado() {
    this.subscription.add(
      this.authService
        .getUsuarioLogado()
        .subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  deslogar() {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
    this.router.navigateByUrl('/login');
  }
}
