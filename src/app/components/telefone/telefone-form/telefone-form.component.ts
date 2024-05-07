import { NgIf } from '@angular/common';

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { Telefone } from '../../../models/telefone.models';
import { TelefoneService } from '../../../services/telefone.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-telefone-form',
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
  templateUrl: './telefone-form.component.html',
  styleUrl: './telefone-form.component.css',
})
export class TelefoneFormComponent {
  formGroup: FormGroup;
  isMenuOpen = false; // Adicionado para controlar a visibilidade do menu
  idUsuario: String;

  constructor(
    private formBuilder: FormBuilder,
    private telefoneService: TelefoneService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    const telefone: Telefone = this.activatedRoute.snapshot.data['telefone'];
    this.idUsuario = this.activatedRoute.snapshot.params['idUsuario'];

    this.formGroup = formBuilder.group({
      id: [telefone && telefone.id ? telefone.id : null],
      codigoArea: [
        telefone && telefone.codigoArea ? telefone.codigoArea : null,
      ],
      numero: [telefone && telefone.numero ? telefone.numero : null],
      idUsuario: this.idUsuario,
    });
  }
  salvarTelefone() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id == null) {
        this.telefoneService.insert(telefone).subscribe({
          next: (telefoneCadastrado) => {
            this.router.navigateByUrl('/telefones/usuario/' + this.idUsuario);
            this.snackBar.open('Telefone adicionado com sucesso!', 'Fechar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.telefoneService.update(telefone).subscribe({
          next: (telefoneAlterado) => {
            this.router.navigateByUrl('/telefones/usuario/' + this.idUsuario);
            this.snackBar.open('Telefone atualizado com sucesso!', 'Fechar', {
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

  excluirTelefone() {
    if (this.formGroup.valid) {
      const telefone = this.formGroup.value;
      if (telefone.id != null) {
        this.telefoneService.delete(telefone).subscribe({
          next: () => {
            this.router.navigateByUrl('/telefones/usuario/' + this.idUsuario);
            this.snackBar.open('Telefone excluido com sucesso!', 'Fechar', {
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

  tratarErros(error: HttpErrorResponse) {
    if (error.status === 400) {
      // erros relacionados a campos
      if (error.error?.errors) {
        error.error.errors.forEach((validationError: any) => {
          // obs: o fieldName tem o mesmo valor da api
          const formControl = this.formGroup.get(validationError.fieldName);
          console.log(validationError);
          if (formControl) {
            console.log(formControl);
            formControl.setErrors({ apiError: validationError.message });
          }
        });
      }
    } else if (error.status < 400) {
      // Erro genérico não relacionado a um campo específico.
      alert(error.error?.message || 'Erro genérico no envio do formulário.');
    } else if (error.status >= 500) {
      alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    codigoArea: {
      required: 'codigoArea deve ser informado.',
      minlength: 'codigoArea deve possuir ao menos 4 caracteres.',
    },
    numero: {
      required: ' numero deve ser informada.',
      minlength: ' numero deve possuir 2 caracteres.',
      // maxlength: 'A sigla deve possuir 2 caracteres.',
      apiError: ' ', // mensagem da api
    },
  };

  getErrorMessage(
    controlName: string,
    errors: ValidationErrors | null | undefined
  ): string {
    if (!errors) {
      return '';
    }
    // retorna a mensagem de erro
    for (const errorName in errors) {
      if (
        errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]
      ) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }
  toggleSidebar(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
