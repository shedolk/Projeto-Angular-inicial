import { PedidoService } from '../../../services/pedido.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Pedido } from '../../../models/pedido.models';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatListModule,
  ],
  templateUrl: './pedido-list.component.html',
  styleUrl: './pedido-list.component.css',
})
export class PedidoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'dataPedido',
    'pagamento',
    'statusPedido',
    'cupom',
    'totalPedido',
    'usuario',
    'itens',
    'acao',
  ];
  pedidos: Pedido[] = [];

  idUsuario: String;

  constructor(
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.pedidoService.findAll().subscribe((data) => {
      this.pedidos = data;
    });
  }

  excluirPedido(pedido: Pedido) {
    this.pedidoService.delete(pedido).subscribe({
      next: () => {
        this.router.navigateByUrl('/pedidos');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
