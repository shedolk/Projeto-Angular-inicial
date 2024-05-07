import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Telefone } from '../../../models/telefone.models';
import { TelefoneService } from '../../../services/telefone.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

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
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css',
})
export class TelefoneListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'codigoArea', 'numero', 'acao'];
  telefones: Telefone[] = [];
  isMenuOpen = false; // Adicionado para controlar a visibilidade do menu

  idUsuario: String;

  constructor(
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.idUsuario = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.telefoneService.findByIdUsuario(this.idUsuario).subscribe((data) => {
      this.telefones = data;
    });
  }

  excluirTelefone(telefone: Telefone) {
    this.telefoneService.delete(telefone).subscribe({
      next: () => {
        this.router.navigateByUrl('/telefones/usuario/' + this.idUsuario);
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
