import { UsuarioService } from './../../../services/usuario.service';
import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [NgFor, MatTableModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'email', 'idade'];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }
}
