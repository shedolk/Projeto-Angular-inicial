import { NgIf } from '@angular/common';
import { PedidoService } from '../../../services/pedido.service';
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
import { Pedido } from '../../../models/pedido.models';

@Component({
  selector: 'app-pedido-form',
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
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css',
})
export class PedidoFormComponent {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const pedido: Pedido = this.activatedRoute.snapshot.data['pedido'];

    this.formGroup = formBuilder.group({
      // id: [pedido && pedido.id ? pedido.id : null],
      // rua: [pedido && pedido.rua ? pedido.rua : null],
      // numero: [pedido && pedido.numero ? pedido.numero : null],
      // cidade: [pedido && pedido.cidade ? pedido.cidade : null],
      // estado: [pedido && pedido.estado ? pedido.estado : null],
      // cep: [pedido && pedido.cep ? pedido.cep : null],
      // idUsuario: [pedido && pedido.usuario.id ? pedido.usuario.id : null],
    });
  }
  salvarPedido() {
    if (this.formGroup.valid) {
      const pedido = this.formGroup.value;
      if (pedido.id == null) {
        this.pedidoService.insert(pedido).subscribe({
          next: (pedidoCadastrado) => {
            this.router.navigateByUrl('/pedidos');
          },
          error: (err) => {
            console.log('Erro ao Incluir' + JSON.stringify(err));
          },
        });
      } else {
        this.pedidoService.update(pedido).subscribe({
          next: (pedidoAlterado) => {
            this.router.navigateByUrl('/pedidos');
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
          },
        });
      }
    }
  }

  excluirPedido() {
    if (this.formGroup.valid) {
      const pedido = this.formGroup.value;
      if (pedido.id != null) {
        this.pedidoService.delete(pedido).subscribe({
          next: () => {
            this.router.navigateByUrl('/pedidos');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          },
        });
      }
    }
  }
}