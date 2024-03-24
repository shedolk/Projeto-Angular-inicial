import { NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
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
import { Product } from '../../../models/product.models';

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
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const product: Product = this.activatedRoute.snapshot.data['product'];

    this.formGroup = formBuilder.group({
      id: [product && product.id ? product.id : null],
      nome: [product && product.nome ? product.nome : null],
      descricao: [product && product.descricao ? product.descricao : null],
      category: [product && product.category ? product.category : ''],
      preco: [product && product.preco ? product.preco : null],
      estoque: [product && product.estoque ? product.estoque : null],
      nomeImagem: [product && product.nomeImagem ? product.nomeImagem : null],
    });
  }
  salvarProduct() {
    if (this.formGroup.valid) {
      const product = this.formGroup.value;
      if (product.id == null) {
        this.productService.insert(product).subscribe({
          next: (productCadastrado) => {
            this.router.navigateByUrl('/produtos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.productService.update(product).subscribe({
          next: (productAlterado) => {
            this.router.navigateByUrl('/produtos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
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
}
