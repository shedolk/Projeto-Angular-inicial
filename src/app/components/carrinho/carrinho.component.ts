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
import { AuthService } from '../../services/auth.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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
    MatExpansionModule,
    MatFormField,
    MatLabel,
    FormsModule
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent {
  carrinhoItens: ItemCarrinho[] = [];
  usuarioLogado: boolean = false;
  showLoginPanel: boolean = false;

  cupom: string = '';
  desconto: number = 0;

  constructor(private carrinhoService: CarrinhoService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getUsuarioLogado().subscribe((usuario) => {
      this.usuarioLogado = !!usuario;
    });
    this.carrinhoService.carrinho$.subscribe((itens) => {
      this.carrinhoItens = itens;
    });
  }

  toggleLoginPanel(): void {
    this.showLoginPanel = !this.showLoginPanel;
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

  calcularTotalComDesconto(): number {
    const total = this.calcularTotal();
    return total - this.desconto;
  }

  aplicarCupom(): void {
    // Lógica para verificar os cupons
    if (this.cupom === 'desconto10') {
      this.desconto = this.calcularTotal() * 0.10; // 10% de desconto
    } else if (this.cupom === 'diadospais') {
      this.desconto = this.carrinhoItens.reduce(
      (total, item) => total + (item.preco * item.quantidade * 0.15), // 15% de desconto
      0
    );
    } else {
      this.desconto = 0;
      alert('Cupom inválido');
    }
    this.carrinhoService.aplicarDesconto(this.desconto);
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

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
