import { Component, OnInit } from '@angular/core';
import { DadosTecnicos } from '../../../models/dadostecnicos.models';
import { DadostecnicosService } from '../../../services/dadostecnicos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dadostecnicos-list',
  standalone: true,
  imports: [NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatPaginatorModule],
  templateUrl: './dadostecnicos-list.component.html',
  styleUrl: './dadostecnicos-list.component.css'
})
export class DadostecnicosListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'compatibilidade', 'tipoMola', 'tipoAmortecedor', 'fornecedor', 'embalagem', 'peso', 'acao'];

  dadosTecnicos: DadosTecnicos[] = [];

  // variaveis de controle de paginacao
  totalRecords = 0;
  pageSize = 2;
  page = 0;

  constructor(
    private dadosTecnicosService: DadostecnicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadDadosTecnicos();
  }

  loadDadosTecnicos(): void {
    this.dadosTecnicosService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.dadosTecnicos = data;
      console.log(this.dadosTecnicos);
    });

  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadDadosTecnicos(); // Chamando loadDadosTecnicos() ao invés de ngOnInit()
  }

  excluirDadosTecnicos(dadosTecnicos: DadosTecnicos) {
    this.dadosTecnicosService.delete(dadosTecnicos).subscribe({
      next: () => {
        console.log('Dados Tecnicos excluído com sucesso!');
        this.router.navigateByUrl('/dadostecnicos');
        this.loadDadosTecnicos();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
