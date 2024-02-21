import { NgIf } from '@angular/common';
import { UsuarioService } from './../../../services/usuario.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formGroup = formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      idade: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.formGroup.valid) {
      const novoUsuario = this.formGroup.value;
      this.usuarioService.salvar(novoUsuario).subscribe({
        next: (UsuarioCadastrado) => {
          this.router.navigateByUrl('/usuarios');
        },
        error: (err) => {
          console.log('Error ao salvar' + JSON.stringify(err));
        },
      });
    }
  }
}
