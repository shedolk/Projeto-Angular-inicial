import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.models';
import { CategoryService } from '../../../services/categoria.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatSelectModule
    // CategoryListModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'suspensao', 'compatibilidade', 'mola', 'amortecedor',  'acao'];
  categories: Category[] = [];

  // totalRegistros = 0;
  // pageSize = 10;
  // pagina = 0;
  // filtro: string = "";

  totalRecords = 0;
  pageSize = 5;
  page = 0;

  filterValue = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSuspensoes();
  }

  loadSuspensoes(): void {
    this.categoryService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });

  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadSuspensoes(); // Chamando loadSuspensoes() ao invés de ngOnInit()
  }

  excluirSuspensao(category: Category) {
    this.categoryService.delete(category).subscribe({
      next: () => {
        console.log('Suspensao excluída com sucesso!');
        this.router.navigateByUrl('/categories');
        this.loadSuspensoes();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
