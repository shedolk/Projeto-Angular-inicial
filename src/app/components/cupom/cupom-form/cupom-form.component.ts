import { NgIf } from '@angular/common';
import { CupomService } from '../../../services/cupom.service';
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
import { Cupom } from '../../../models/cupom.models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-cupom-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  ],
  templateUrl: './cupom-form.component.html',
  styleUrl: './cupom-form.component.css',
})
export class CupomFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = this.formBuilder.group({
      id: [cupom && cupom.id ? cupom.id : null],
      nomeCupom: [
        cupom && cupom.nomeCupom ? cupom.nomeCupom : '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      dataAplicada: [cupom && cupom.dataAplicada ? cupom.dataAplicada : null],
      desconto: [
        cupom && cupom.desconto ? cupom.desconto : '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  salvarCupom() {
    // marca todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao =
        cupom.id == null
          ? this.cupomService.insert(cupom)
          : this.cupomService.update(cupom);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/cupom'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluirCupom() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id != null) {
        this.cupomService.delete(cupom).subscribe({
          next: () => {
            this.router.navigateByUrl('/cupom');
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
    nomeCupom: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve possuir ao menos 4 caracteres.',
    },
    dataAplicada: {
      required: 'A data deve ser informada.',
      minlength: 'A data deve possuir 2 caracteres.',
      // maxlength: 'A sigla deve possuir 2 caracteres.',
      apiError: ' ', // mensagem da api
    },
    desconto: {
      required: 'O desconto deve ser informada.',
      minlength: 'O desconto deve possuir 2 caracteres.',
      maxlength: 'A desconto deve possuir 50 caracteres.',
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
}
