import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Telefone } from '../../../models/telefone.models';
import { TelefoneService } from '../../../services/telefone.service';

@Component({
  selector: 'app-telefone-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css',
})
export class TelefoneListComponent implements OnInit {
  displayedColumns: string[] = [
    // 'id',
    // 'nome',
    // 'login',
    // 'senha',
    // 'cpf',

    // 'perfil',
    // 'codigoArea',
    // 'numero',
    // 'rua',
    // 'numeroCasa',
    // 'cidade',
    // 'estado',
    // 'cep',
    'acao',
  ];
  telefones: Telefone[] = [];

  constructor(
    private telefoneService: TelefoneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.telefoneService.findAll().subscribe((data) => {
      this.telefones = data;
    });
  }

  excluirTelefone(telefone: Telefone) {
    this.telefoneService.delete(telefone).subscribe({
      next: () => {
        this.router.navigateByUrl('/telefones');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
