import { NgIf } from '@angular/common';
import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Usuario } from '../../../models/usuario.model';
import { CommonModule } from '@angular/common';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    CommonModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];

    this.formGroup = this.formBuilder.group({
      id: [usuario && usuario.id ? usuario.id : null],
      nome: [usuario && usuario.nome ? usuario.nome : '', Validators.required],
      login: [
        usuario && usuario.login ? usuario.login : '',
        Validators.required,
      ],
      senha: [
        usuario && usuario.senha ? usuario.senha : '',
        Validators.required,
      ],
      cpf: [usuario && usuario.cpf ? usuario.cpf : '', Validators.required],
      perfil: [usuario && usuario.perfil ? usuario.perfil.label : ''],
    });
  }
  salvarUsuario() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id == null) {
        this.usuarioService.insert(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.router.navigateByUrl('/usuarios');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (usuarioAlterado) => {
            this.router.navigateByUrl('/usuarios');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirUsuario() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;
      if (usuario.id != null) {
        this.usuarioService.delete(usuario).subscribe({
          next: () => {
            this.router.navigateByUrl('/usuarios');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
