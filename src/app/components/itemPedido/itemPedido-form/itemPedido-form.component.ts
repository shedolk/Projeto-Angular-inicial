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
import { ItemPedido } from '../../../models/itemPedido.models';
import { ItemPedidoService } from '../../../services/itemPedido.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-itempedido-form',
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
  ],
  templateUrl: './itempedido-form.component.html',
  styleUrl: './itempedido-form.component.css',
})
export class ItemPedidoFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private itempedidoService: ItemPedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const itempedido: ItemPedido =
      this.activatedRoute.snapshot.data['itempedido'];

    this.formGroup = formBuilder.group({
      id: [itempedido && itempedido.id ? itempedido.id : null],
      quantidade: [
        itempedido && itempedido.quantidade ? itempedido.quantidade : null,
      ],
      preco: [itempedido && itempedido.preco ? itempedido.preco : null],
      productId: [
        itempedido && itempedido.product.id ? itempedido.product.id : null,
      ],
      pedidoId: [
        itempedido && itempedido.pedido.id ? itempedido.pedido.id : null,
      ],
    });
  }
  salvarItemPedido() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const itempedido = this.formGroup.value;
      if (itempedido.id == null) {
        this.itempedidoService.insert(itempedido).subscribe({
          next: (itempedidoCadastrado) => {
            this.router.navigateByUrl('/itenspedidos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.itempedidoService.update(itempedido).subscribe({
          next: (itempedidoAlterado) => {
            this.router.navigateByUrl('/itenspedidos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirItemPedido() {
    if (this.formGroup.valid) {
      const itempedido = this.formGroup.value;
      if (itempedido.id != null) {
        this.itempedidoService.delete(itempedido).subscribe({
          next: () => {
            this.router.navigateByUrl('/itenspedidos');
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
    quantidade: {
      required: 'quantidade deve ser informado.',
      minlength: 'quantidade deve possuir ao menos 4 caracteres.',
    },
    preco: {
      required: ' preco deve ser informada.',
      minlength: ' preco deve possuir 2 caracteres.',
      // maxlength: 'A sigla deve possuir 2 caracteres.',
      apiError: ' ', // mensagem da api
    },
    productId: {
      required: 'O productId deve ser informada.',
      minlength: 'O productId deve possuir 2 caracteres.',
      // maxlength: 'A productId deve possuir 50 caracteres.',
      apiError: ' ', // mensagem da api
    },
    pedidoId: {
      required: ' pedidoId deve ser informada.',
      minlength: ' pedidoId deve possuir 2 caracteres.',
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
}
