import { NgIf } from '@angular/common';
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
import { ItemPedido } from '../../../models/itemPedido.models';
import { ItemPedidoService } from '../../../services/itemPedido.service';

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
      product: [
        itempedido && itempedido.product.id ? itempedido.product.id : null,
      ],
      pedido: [
        itempedido && itempedido.pedido.id ? itempedido.pedido.id : null,
      ],
    });
  }
  salvarItemPedido() {
    if (this.formGroup.valid) {
      const itempedido = this.formGroup.value;
      if (itempedido.id == null) {
        this.itempedidoService.insert(itempedido).subscribe({
          next: (itempedidoCadastrado) => {
            this.router.navigateByUrl('/itempedidos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.itempedidoService.update(itempedido).subscribe({
          next: (itempedidoAlterado) => {
            this.router.navigateByUrl('/itempedidos');
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
            this.router.navigateByUrl('/itempedidos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}
