import { DadosTecnicos } from './../../../models/dadostecnicos.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { DadostecnicosService } from '../../../services/dadostecnicos.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dadostecnicos-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './dadostecnicos-form.component.html',
  styleUrl: './dadostecnicos-form.component.css'
})
export class DadostecnicosFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dadosTecnicosService: DadostecnicosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const dadosTecnicos: DadosTecnicos = this.activatedRoute.snapshot.data['dadosTecnicos'];

    this.formGroup = this.formBuilder.group({
      id: [dadosTecnicos?.id || null],
      compatibilidade: [dadosTecnicos?.compatibilidade || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      tipoMola: [dadosTecnicos?.tipoMola || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      tipoAmortecedor: [dadosTecnicos?.tipoAmortecedor || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      fornecedor: [dadosTecnicos?.fornecedor || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      embalagem: [dadosTecnicos?.embalagem || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      peso: [dadosTecnicos?.peso || '', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  salvar() {
    // marca todos os campos do formulario como touched
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const dadosTecnicos = this.formGroup.value;
      // operacao obtem o retorno de um observable de insert ou update
      const operacao = dadosTecnicos.id == null
        ? this.dadosTecnicosService.insert(dadosTecnicos)
        : this.dadosTecnicosService.update(dadosTecnicos);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/dadostecnicos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        }
      });
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
      };
    } else if (error.status < 400) {
      // Erro genérico não relacionado a um campo específico.
      alert(error.error?.message || 'Erro genérico no envio do formulário.');
    } else if (error.status >= 500) {
      alert('Erro interno do servidor. Por favor, tente novamente mais tarde.');
    }
  }

  excluir() {
    if (this.formGroup.valid) {
      const dadostecnicos = this.formGroup.value;
      if (dadostecnicos.id != null) {
        this.dadosTecnicosService.delete(dadostecnicos).subscribe({
          next: () => {
            this.router.navigateByUrl('/dadostecnicoss');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }
  errorMessages: { [controlName: string]: { [errorName: string]: string } } = {
    compatibilidade: {
      required: 'A compatibilidade deve ser informada.',
      minlength: 'A compatibilidade deve possuir pelo menos 4 caracteres.'
    },
    tipoMola: {
      required: 'O tipo de mola deve ser informado.',
      minlength: 'O tipo de mola deve possuir pelo menos 4 caracteres.'
    },
    tipoAmortecedor: {
      required: 'O tipo de amortecedor deve ser informado.',
      minlength: 'O tipo de amortecedor deve possuir pelo menos 4 caracteres.'
    },
    fornecedor: {
      required: 'O fornecedor deve ser informado.',
      minlength: 'O fornecedor deve possuir pelo menos 4 caracteres.'
    },
    embalagem: {
      required: 'A embalagem deve ser informada.',
      minlength: 'A embalagem deve possuir pelo menos 4 caracteres.'
    },
    peso: {
      required: 'O peso deve ser informado.',
      minlength: 'O peso deve possuir pelo menos 4 caracteres.'
    }
  };

  getErrorMessage(controlName: string, errors: ValidationErrors | null | undefined): string {
    if (!errors) {
      return '';
    }
    // retorna a mensagem de erro
    for (const errorName in errors) {
      if (errors.hasOwnProperty(errorName) &&
        this.errorMessages[controlName][errorName]) {
        return this.errorMessages[controlName][errorName];
      }
    }

    return 'Erro não mapeado (entre em contato com o desenvolvedor)';
  }
}
