import { EnderecoService } from './../../../services/endereco.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Endereco } from '../../../models/endereco.models';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css',
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'rua',
    'numero',
    'cidade',
    'estado',
    'cep',
    'acao',
  ];
  enderecos: Endereco[] = [];

  idUsuario: String;

  constructor(
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.enderecoService.findByIdUsuario(this.idUsuario).subscribe((data) => {
      this.enderecos = data;
    });
  }

  excluirEndereco(endereco: Endereco) {
    this.enderecoService.delete(endereco).subscribe({
      next: () => {
        this.router.navigateByUrl('/enderecos');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
