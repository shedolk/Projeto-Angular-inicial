import { ProductService } from '../../../services/product.service';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../../models/product.models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
    CommonModule
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

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.count().subscribe(data => {
    this.totalRecords = data;
    console.log(this.totalRecords);
    });
  }

  loadProducts(): void {
    this.productService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.products = data;
      console.log(this.products);
    });
  }

  getUrlImagem(nomeImagem: string): string {
    return this.productService.getUrlImagem(nomeImagem);
}

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts(); // Chamando loadProducts() ao invés de ngOnInit()
  }

  excluir(product: Product) {
    this.productService.delete(product).subscribe({
      next: () => {
        // this.router.navigateByUrl('/produtos');
        // this.ngOnInit();
        this.loadProducts();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}

