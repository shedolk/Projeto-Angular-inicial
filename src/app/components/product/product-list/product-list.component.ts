import { ProductService } from '../../../services/product.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product.models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'descricao',
    'category',
    'preco',
    'estoque',
    'nomeImagem',
    'acao',
  ];
  products: Product[] = [];

  idUsuario: String;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.findByIdUsuario(this.idUsuario).subscribe((data) => {
      this.products = data;
    });
  }

  excluirProduct(product: Product) {
    this.productService.delete(product).subscribe({
      next: () => {
        this.router.navigateByUrl('/produtos');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
