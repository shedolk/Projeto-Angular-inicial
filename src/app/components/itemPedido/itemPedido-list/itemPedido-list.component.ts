import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemPedido } from '../../../models/itemPedido.models';
import { ItemPedidoService } from '../../../services/itemPedido.service';

@Component({
  selector: 'app-itempedido-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './itempedido-list.component.html',
  styleUrl: './itempedido-list.component.css',
})
export class ItemPedidoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'quantidade',
    'preco',
    'product',
    'pedido',
    'acao',
  ];
  itempedidos: ItemPedido[] = [];

  idUsuario: String;

  constructor(
    private itempedidoService: ItemPedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.itempedidoService.findByIdUsuario(this.idUsuario).subscribe((data) => {
      this.itempedidos = data;
    });
  }

  excluirItemPedido(itempedido: ItemPedido) {
    this.itempedidoService.delete(itempedido).subscribe({
      next: () => {
        this.router.navigateByUrl('/itempedidos');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
