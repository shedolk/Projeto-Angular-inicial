import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule,

    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
})
export class UsuarioListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nome',
    'login',
    'senha',
    'cpf',
    'perfil',
    'listaTelefone',
    'listaEndereco',
    'acao',
  ];
  usuarios: Usuario[] = [];
  isMenuOpen = false;

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

  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
