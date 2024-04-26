import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemPedido } from '../../../models/itemPedido.models';
import { ItemPedidoService } from '../../../services/itemPedido.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

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
    MatPaginatorModule,
    MatListModule,
    MatSidenavModule,
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

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;
  isMenuOpen = false;

  constructor(
    private itempedidoService: ItemPedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadItemPedidos();
  }

  loadItemPedidos(): void {
    this.itempedidoService
      .findAll(this.page, this.pageSize)
      .subscribe((data) => {
        this.itempedidos = data;
        console.log(this.itempedidos);
      });

    // Removendo a chamada para 'this.itempedidoService.count()' que não está definida no serviço
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadItemPedidos(); // Chamando loadItemPedidos() ao invés de ngOnInit()
  }

  excluirItemPedido(itempedido: ItemPedido) {
    this.itempedidoService.delete(itempedido).subscribe({
      next: () => {
        this.router.navigateByUrl('/itenspedidos');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
