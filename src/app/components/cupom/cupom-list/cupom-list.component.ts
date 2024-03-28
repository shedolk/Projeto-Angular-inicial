import { CupomService } from '../../../services/cupom.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cupom } from '../../../models/cupom.models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cupom-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule,
  ],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css',
})
export class CupomListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nomeCupom',
    'dataAplicada',
    'desconto',
    'acao',
  ];
  cupoms: Cupom[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCupoms();
  }

  loadCupoms(): void {
    this.cupomService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.cupoms = data;
      console.log(this.cupoms);
    });

    // Removendo a chamada para 'this.cupomService.count()' que não está definida no serviço
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadCupoms(); // Chamando loadCupoms() ao invés de ngOnInit()
  }

  excluirCupom(cupom: Cupom) {
    this.cupomService.delete(cupom).subscribe({
      next: () => {
        console.log('Cupom excluído com sucesso!');
        this.router.navigateByUrl('/cupom');
        this.loadCupoms();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
