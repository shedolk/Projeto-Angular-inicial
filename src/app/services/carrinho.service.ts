import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ItemCarrinho } from '../models/itemcarrinho.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<ItemCarrinho[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  private totalComDescontoSubject = new BehaviorSubject<number>(0);
  totalComDesconto$ = this.totalComDescontoSubject.asObservable();

  private desconto = 0;

  constructor(private localStorageService: LocalStorageService) {
    const carrinhoArmazenado =
      this.localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(carrinhoArmazenado);
    this.atualizarTotalComDesconto();
  }

  adicionar(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemExistente = carrinhoAtual.find((i) => i.id === item.id);

    if (itemExistente) {
      itemExistente.quantidade += item.quantidade || 1;
    } else {
      carrinhoAtual.push({ ...item });
    }

    this.carrinhoSubject.next(carrinhoAtual);
    this.atualizarArmazenamentoLocal();
    this.atualizarTotalComDesconto();
  }

  remover(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const carrinhoAtualizado = carrinhoAtual.filter((i) => i !== item);

    this.carrinhoSubject.next(carrinhoAtualizado);
    this.atualizarArmazenamentoLocal();
    this.atualizarTotalComDesconto();
  }

  limparCarrinho(): void {
    this.carrinhoSubject.next([]);
    this.localStorageService.removeItem('carrinho');
    this.totalComDescontoSubject.next(0);
    this.desconto = 0; // Limpar desconto
  }

  private atualizarArmazenamentoLocal(): void {
    this.localStorageService.setItem('carrinho', this.carrinhoSubject.value);
  }

  atualizarItem(item: ItemCarrinho): void {
    const carrinhoAtual = this.carrinhoSubject.value;
    const itemIndex = carrinhoAtual.findIndex((i) => i.id === item.id);

    if (itemIndex > -1) {
      carrinhoAtual[itemIndex] = item;
      this.carrinhoSubject.next(carrinhoAtual);
      this.atualizarArmazenamentoLocal();
      this.atualizarTotalComDesconto();
    }
  }

  aplicarDesconto(desconto: number): void {
    this.desconto = desconto;
    this.atualizarTotalComDesconto();
  }

  private atualizarTotalComDesconto(): void {
    const total = this.carrinhoSubject.value.reduce((sum, item) => sum + item.preco * item.quantidade, 0);
    const totalComDesconto = total - this.desconto;
    this.totalComDescontoSubject.next(totalComDesconto);
  }

  getDesconto(): number {
    return this.desconto;
  }
}
