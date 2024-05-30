import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/order.models';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-orders-detalhes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-orders-detalhes.component.html',
  styleUrl: './usuario-orders-detalhes.component.css'
})
export class UsuarioOrdersDetalhesComponent implements OnInit {

  pedido: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarDetalhesPedido(Number(id));
    }
  }

  carregarDetalhesPedido(id: number): void {
    this.orderService.getPedidoById(id).subscribe(pedido => {
      this.pedido = pedido;
    });
  }
}
