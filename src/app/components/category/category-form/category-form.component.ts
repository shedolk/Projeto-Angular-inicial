import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/categoria.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../models/category.models';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    MatDatepickerModule,
    MatIconModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const category: Category = this.activatedRoute.snapshot.data['category'];

    // this.formGroup = this.formBuilder.group({
    //   id: [category && category.id ? category.id : null],
    //   category: [category && category.category ? category.category : '',
    //   Validators.compose([Validators.required, Validators.minLength(4)]),
    //   ],
    //   material: [category.material && category.material ? category.material : '',
    //   Validators.compose([Validators.required, Validators.minLength(4)]),
    //   ],
    // });

    this.formGroup = this.formBuilder.group({
      id: [category?.id || null],
      category: [category?.category || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      compatibilidade: [category?.compatibilidade || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      mola: [category?.tipoMola || '', Validators.compose([Validators.required, Validators.minLength(4)])],
      amortecedor: [category?.tipoAmortecedor || '', Validators.compose([Validators.required, Validators.minLength(4)])],
     // material: [category?.material || '', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  salvarCategory() {
    // marca todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const category = this.formGroup.value;

      // operacao obtem o retorno de um observable de insert ou update
      const operacao =
        category.id == null
          ? this.categoryService.insert(category)
          : this.categoryService.update(category);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/categories'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluirCategory() {
    if (this.formGroup.valid) {
      const category = this.formGroup.value;
      if (category.id != null) {
        this.categoryService.delete(category).subscribe({
          next: () => {
            this.router.navigateByUrl('/categories');
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
    category: {
      required: 'O tipo de suspensao deve ser informado.',
      minlength: 'O tipo de suspensao deve possuir ao menos 4 caracteres.',
    },
    material: {
      required: 'O material da suspensao deve ser informado.',
      minlength: 'O campo deve possuir no mínimo 2 caracteres.',
      maxlength: 'A campo deve possuir no máximo 20 caracteres.',
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
