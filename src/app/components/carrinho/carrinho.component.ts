import { Component } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.models';
import { CarrinhoService } from '../../services/carrinho.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent {
  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService, private router: Router) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
    });
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  finalizarCompra(): void {
    alert('Compra finalizada com sucesso!');
    this.carrinhoService.limparCarrinho();
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
  }

  aumentarQuantidade(item: ItemCarrinho): void {
    item.quantidade += 1;
    this.carrinhoService.atualizarItem(item);
  }

  diminuirQuantidade(item: ItemCarrinho): void {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this.carrinhoService.atualizarItem(item);
    }
  }

  continuarComprando(): void {
    this.router.navigate(['/produtos']);
  }

  irParaCheckout() {
    this.router.navigate(['/checkout']);
  }
}
