import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CategoryService } from '../../../services/categoria.service';

@Component({
  selector: 'app-usuario-admincontrol',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './usuario-admincontrol.component.html',
  styleUrl: './usuario-admincontrol.component.css'
})
export class UsuarioAdminControlComponent implements OnInit{

  totalUsuarios: number = 0;
  totalProdutos: number = 0;
  totalCategorias: number = 0;
  totalPedidos: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private produtoService: ProductService,
    private categoriaService: CategoryService,
    private pedidoService: OrderService
  ) {}

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

carregarEstatisticas(): void {
  this.usuarioService.getTotalUsuarios().subscribe(total => this.totalUsuarios = total);
  this.produtoService.getTotalProdutos().subscribe(total => this.totalProdutos = total);
  this.categoriaService.getTotalCategorias().subscribe(total => this.totalCategorias = total);
  this.pedidoService.getTotalPedidos().subscribe(total => this.totalPedidos = total);

    // Para agora, vamos usar valores fictícios
    // this.totalUsuarios = 150;
    // this.totalProdutos = 20;
    // this.totalCategorias = 3;
    // this.totalPedidos = 50;
  }
}
