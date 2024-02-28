import { UsuarioService } from './../../../services/usuario.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

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
  displayedColumns: string[] = ['id', 'nome', 'email', 'idade', 'acao'];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe((data) => {
      this.usuarios = data;
    });
  }
}
