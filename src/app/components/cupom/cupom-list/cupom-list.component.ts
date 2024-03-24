import { CupomService } from '../../../services/cupom.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cupom } from '../../../models/cupom.models';

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
  ],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css',
})
export class CupomListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'rua',
    'numero',
    'cidade',
    'estado',
    'cep',
    'acao',
  ];
  cupoms: Cupom[] = [];

  idUsuario: String;

  constructor(
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.cupomService.findByIdUsuario(this.idUsuario).subscribe((data) => {
      this.cupoms = data;
    });
  }

  excluirCupom(cupom: Cupom) {
    this.cupomService.delete(cupom).subscribe({
      next: () => {
        this.router.navigateByUrl('/cupoms');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
