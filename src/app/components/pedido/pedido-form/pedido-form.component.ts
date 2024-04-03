import { UsuarioService } from './../../../services/usuario.service';
import { ItemPedidoService } from './../../../services/itemPedido.service';
import { CupomService } from './../../../services/cupom.service';
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
import { MatSelectModule } from '@angular/material/select';
import { Pagamento } from '../../../models/pagamento.models';
import { StatusPedido } from '../../../models/statusPedido.models';
import { Cupom } from '../../../models/cupom.models';
import { ItemPedido } from '../../../models/itemPedido.models';
import { PagamentoService } from '../../../services/pagamento.service';
import { StatusPedidoService } from '../../../services/statusPedido.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-pedido-form',
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
    MatSelectModule,
    MatDatepickerModule,
  ],
  templateUrl: './pedido-form.component.html',
  styleUrl: './pedido-form.component.css',
})
export class PedidoFormComponent {
  formGroup: FormGroup;
  pagamentos: Pagamento[] = [];
  statusPedidos: StatusPedido[] = [];
  cupons: Cupom[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private CupomService: CupomService,
    private PagamentoService: PagamentoService,
    private StatusPedidoService: StatusPedidoService,
    private UsuarioService: UsuarioService
  ) {
    const pedido: Pedido = this.activatedRoute.snapshot.data['pedido'];

    this.formGroup = formBuilder.group({
      id: [pedido && pedido.id ? pedido.id : null],
      dataPedido: [pedido && pedido.dataPedido ? pedido.dataPedido : null],
      pagamento_id: [pedido && pedido.pagamento ? pedido.pagamento.id : null],
      statusPedido: [
        pedido && pedido.statusPedido.id ? pedido.statusPedido.id : null,
      ],
      cupom_id: [pedido && pedido.cupom.id ? pedido.cupom.id : null],
      totalPedido: [pedido && pedido.totalPedido ? pedido.totalPedido : null],
      usuario_id: [pedido && pedido.usuario.id ? pedido.usuario.id : null],
    });
  }

  ngOnInit(): void {
    this.CupomService.findAll().subscribe((data) => {
      this.cupons = data;
    });
    this.PagamentoService.findAll().subscribe((data) => {
      this.pagamentos = data;
    });
    this.StatusPedidoService.findAll().subscribe((data) => {
      this.statusPedidos = data;
    });
    this.UsuarioService.findAll().subscribe((data) => {
      this.usuarios = data;
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
