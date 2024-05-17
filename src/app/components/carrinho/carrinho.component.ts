import { Component } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.models';
import { CarrinhoService } from '../../services/carrinho.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {

  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService
  ) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe( itens => {
      this.carrinhoItens = itens;
    })
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }

  finalizarCompra(): void {

  }

  calcularTotal(): number {
    return 1;
  }
}
