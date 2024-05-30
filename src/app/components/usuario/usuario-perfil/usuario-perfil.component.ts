import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.models';
import { Usuario } from '../../../models/usuario.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [CommonModule, // Adicionar CommonModule
  MatButtonModule,
RouterModule],
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.css'
})
export class UsuarioPerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  pedidos: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe(usuario => {
      this.usuario = usuario;
      if (usuario) {
        this.carregarPedidos(usuario.login);
      }
    });
  }

  carregarPedidos(login: string): void {
    this.orderService.getPedidosPorUsuario(login).subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

  editarDados(): void {
    this.router.navigate(['/usuarios/edit', this.usuario?.id]);
  }

  verDetalhes(pedidoId: number): void {
    this.router.navigate(['/pedidos', pedidoId]);
  }
}
