import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../models/order.models';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-orders-detalhes',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIcon ],
  templateUrl: './usuario-orders-detalhes.component.html',
  styleUrl: './usuario-orders-detalhes.component.css'
})
export class UsuarioOrdersDetalhesComponent implements OnInit {

  pedido: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDetalhesPedido(Number(id));
    }
  }

  carregarDetalhesPedido(id: number): void {
    this.orderService.getPedidoById(id).subscribe(pedido => {
      console.log('Pedido recebido:', pedido);
      this.pedido = pedido;
    });
  }

  voltar(): void {
    this.router.navigate(['/perfil']);
  }
}
