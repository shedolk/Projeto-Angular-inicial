import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order.models';
import { Usuario } from '../../../models/usuario.model';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { Endereco } from '../../../models/endereco.models';
import { Telefone } from '../../../models/telefone.models';
import { UsuarioService } from '../../../services/usuario.service';
import { EnderecoService } from '../../../services/endereco.service';
import { TelefoneService } from '../../../services/telefone.service';

@Component({
  selector: 'app-usuario-perfil',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltip,
    MatTooltipModule],
  templateUrl: './usuario-perfil.component.html',
  styleUrl: './usuario-perfil.component.css'
})
export class UsuarioPerfilComponent implements OnInit {
  usuario: Usuario | null = null;
  pedidos: Order[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe(usuario => {
      this.usuario = usuario;
      if (usuario) {
        this.carregarPedidos(usuario.login);
      }
    });
  }

  carregarPedidos(login: string): void {
    this.orderService.getPedidosPorUsuario(login).subscribe((pedidos) => {
      this.pedidos = pedidos;
    });
  }

  editarDados(): void {
    if (this.usuario && this.usuario.login) {
      this.usuarioService.findByLogin(this.usuario.login).subscribe((usuario) => {
        if (usuario && usuario.id) {
          this.router.navigate(['/usuarios/edit', usuario.id]);
        }
      });
    }
  }

  // editarDados(): void {
  //   if (this.usuario && this.usuario.id) {
  //     this.router.navigate(['/usuarios/edit', this.usuario.id]);
  //   }
  // }

  verDetalhes(pedidoId: number): void {
    this.router.navigate(['/pedidos', pedidoId]);
  }

  voltarParaPrincipal(): void {
    this.router.navigate(['/']);
  }
}
