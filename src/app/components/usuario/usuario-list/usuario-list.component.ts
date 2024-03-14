import { UsuarioService } from './../../../services/usuario.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'login',
    'senha',
    'perfil',
    'listaTelefone',
    'listaEndereco',
    'acao',
  ];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe((data) => {
      this.usuarios = data;
    });
  }

  excluirUsuario(usuario: Usuario) {
    this.usuarioService.delete(usuario).subscribe({
      next: () => {
        this.router.navigateByUrl('/usuarios');
        this.ngOnInit();
      },
      error: (err) => {
        console.log('Erro ao Excluir' + JSON.stringify(err));
      },
    });
  }
}
