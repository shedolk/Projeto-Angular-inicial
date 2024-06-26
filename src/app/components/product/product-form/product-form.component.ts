import { Category } from './../../../models/category.models';
import { NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
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
import { Product } from '../../../models/product.models';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/categoria.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-form',
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
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  formGroup: FormGroup;
  categories: Category[] = [];

  selectedFile: File | null = null;
  imageUrl: string | null = null;
  snackBar: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    const product: Product = this.activatedRoute.snapshot.data['product'];

    this.formGroup = formBuilder.group({
      id: [product && product.id ? product.id : null],
      nome: [
        product && product.nome ? product.nome : '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      descricao: [
        product && product.descricao ? product.descricao : '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
      //category: [null],
      idCategory: [product && product.category.id ? product.category.id : ''],
      preco: [product && product.preco ? product.preco : null],
      estoque: [product && product.estoque ? product.estoque : null],
      nomeImagem: [product && product.nomeImagem ? product.nomeImagem : null],
      //idCategory: [product && product.category.id ? product.category.id : ''],
    });

    if (product && product.nomeImagem) {
      this.imageUrl = this.productService.getUrlImagem(product.nomeImagem);
    }

  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
      //this.initializeForm();
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.formGroup.patchValue({ nomeImagem: this.selectedFile.name });
    }
  }

  // onUpload() {
  //   const productId = this.formGroup.get('id')?.value;
  //   if (this.selectedFile && productId) {
  //     this.productService.uploadImagem(productId, this.selectedFile).subscribe(
  //       (response) => {
  //         console.log('Upload successful', response);
  //         this.imageUrl = this.productService.getUrlImagem(this.selectedFile!.name);
  //       },
  //       (error) => console.error('Upload error', error)
  //     );
  //   }
  // }

  onUpload(): void {
    const productId = this.formGroup.get('id')?.value;
    if (this.selectedFile && productId) {
      this.productService.uploadImagem(productId, this.selectedFile).subscribe(
        (response) => {
          console.log('Upload successful', response);
          this.imageUrl = this.productService.getUrlImagem(this.selectedFile!.name);
          this.snackBar.open('Imagem enviada com sucesso!', 'Fechar', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Upload error', error);
          this.snackBar.open('Erro ao enviar imagem. Tente novamente.', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }

  salvarProduct() {
    // marca todos os campos do formulario como 'touched'
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      const product = this.formGroup.value;
      console.log(product);

      // operacao obtem o retorno de um observable de insert ou update
      const operacao =
        product.id == null
          ? this.productService.insert(product)
          : this.productService.update(product);

      // realiza a operacao e trata a resposta.
      operacao.subscribe({
        next: () => this.router.navigateByUrl('/admin/produtos'),
        error: (error: HttpErrorResponse) => {
          console.log('Erro ao salvar' + JSON.stringify(error));
          this.tratarErros(error);
        },
      });
    }
  }

  excluirProduct() {
    if (this.formGroup.valid) {
      const product = this.formGroup.value;
      if (product.id != null) {
        this.productService.delete(product).subscribe({
          next: () => {
            this.router.navigateByUrl('/produtos');
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
    nome: {
      required: 'O nome deve ser informado.',
      minlength: 'O nome deve possuir ao menos 4 caracteres.',
    },
    descricao: {
      required: 'a peça deve ser informada.',
      minlength: 'a peça deve possuir 2 caracteres no minimo.',
      maxlength: 'a descricao deve possuir 60 caracteres no maximo.',
      apiError: ' ', // mensagem da api
    },
    category: {
      required: 'O tipo de suspensao deve ser informado.',
      minlength: 'a peça deve possuir 2 caracteres no minimo.',
      maxlength: 'a descricao deve possuir 60 caracteres no maximo.',
      apiError: ' ', // mensagem da api
    },
    preco: {
      required: 'O tipo de suspensao deve ser informado.',
      minlength: 'a peça deve possuir 2 caracteres no minimo.',
      apiError: ' ', // mensagem da api
    },
    estoque: {
      required: 'O tipo de suspensao deve ser informado.',
      minlength: 'a peça deve possuir 2 caracteres no minimo.',
      apiError: ' ', // mensagem da api
    },
    nomeImagem: {
      required: 'O tipo de suspensao deve ser informado.',
      minlength: 'a peça deve possuir 2 caracteres no minimo.',
      apiError: ' ', // mensagem da api
    }
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
