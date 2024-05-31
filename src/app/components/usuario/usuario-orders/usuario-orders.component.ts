import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Order } from '../../../models/order.models';
import { OrderService } from '../../../services/order.service';
import { Usuario } from '../../../models/usuario.model';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-usuario-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './usuario-orders.component.html',
  styleUrl: './usuario-orders.component.css'
})
export class UsuarioOrdersComponent implements OnInit {

  pedidos: Order[] = [];
  displayedColumns: string[] = ['id', 'dataHora', 'totalPedido'];
  usuario: Usuario | null = null;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.carregarPedidos();
    this.obterUsuarioLogado();
  }

  obterUsuarioLogado(): void {
    this.authService.getUsuarioLogado().subscribe(usuario => {
      this.usuario = usuario;
      if (usuario && usuario.login) {
        this.carregarPedidos(usuario.login);
      }
    });
  }

  carregarPedidos(login: string): void {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado') || '{}');
    if (usuarioLogado && usuarioLogado.login) {
      this.orderService.getPedidosPorUsuario(usuarioLogado.login).subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    } else {
      console.error("Usuário não está logado ou login não encontrado.");
    }
  }

  voltarParaPrincipal(): void {
    this.router.navigate(['/']);
  }
}
