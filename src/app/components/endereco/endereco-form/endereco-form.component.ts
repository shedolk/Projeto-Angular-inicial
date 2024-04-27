import { NgIf } from '@angular/common';
import { EnderecoService } from '../../../services/endereco.service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Endereco } from '../../../models/endereco.models';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-endereco-form',
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
    MatDatepickerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './endereco-form.component.html',
  styleUrl: './endereco-form.component.css',
})
export class EnderecoFormComponent {
  formGroup: FormGroup;
  isMenuOpen = false; // Adicionado para controlar a visibilidade do menu

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    const endereco: Endereco = this.activatedRoute.snapshot.data['endereco'];

    this.formGroup = formBuilder.group({
      id: [endereco && endereco.id ? endereco.id : null],
      rua: [endereco && endereco.rua ? endereco.rua : null],
      numero: [endereco && endereco.numero ? endereco.numero : null],
      cidade: [endereco && endereco.cidade ? endereco.cidade : null],
      estado: [endereco && endereco.estado ? endereco.estado : null],
      cep: [endereco && endereco.cep ? endereco.cep : null],
      idUsuario: [endereco && endereco.usuario.id ? endereco.usuario.id : null],
    });
  }
  salvarEndereco() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id == null) {
        this.enderecoService.insert(endereco).subscribe({
          next: (enderecoCadastrado) => {
            this.router.navigateByUrl('/enderecos');
            this.snackBar.open('Endereço adicionado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.enderecoService.update(endereco).subscribe({
          next: (enderecoAlterado) => {
            this.router.navigateByUrl('/enderecos');
            this.snackBar.open('Endereço atualizado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirEndereco() {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      if (endereco.id != null) {
        this.enderecoService.delete(endereco).subscribe({
          next: () => {
            this.router.navigateByUrl('/enderecos');
            this.snackBar.open('Endereço excluido com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
