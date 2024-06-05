import { MatSnackBar } from '@angular/material/snack-bar';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProductService } from '../../services/product.service';
import { Product } from './../../models/product.models';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idProduct: number;
  nome: string;
  preco: number;
  nomeImagem?: string;
  category: {
    id: number;
    category: string;
    compatibilidade: string;
    tipoMola: string;
    tipoAmortecedor: string;
};
  showDetails: boolean; // Nova propriedade
}

@Component({
  selector: 'app-products-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton, CommonModule, MatExpansionModule],
  templateUrl: './products-card-list.component.html',
  styleUrl: './products-card-list.component.css'
})
export class ProductCardListComponent implements OnInit {

  cards = signal<Card[]> ([]);
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar) {}

    ngOnInit(): void {
      this.carregarProducts();
    }

    carregarProducts() {
      // buscando todos as pecas
      this.productService.findAll(0, 10).subscribe(data => {
        this.products = data;
        this.carregarCards();
      });
    }

    carregarCards() {
      const cards: Card[] = [];
      this.products.forEach(product => {
        cards.push({
          idProduct: product.id,
          nome: product.nome,
          preco: product.preco,
          nomeImagem: product.nomeImagem,
          category: {
            id: product.category.id,
            category: product.category.category,
            compatibilidade: product.category.compatibilidade,
            tipoMola: product.category.tipoMola,
            tipoAmortecedor: product.category.tipoAmortecedor
          },
          showDetails: false // Inicializa como false
        });
      });
      this.cards.set(cards);
    }

    getUrlImagem(nomeImagem: string | undefined): string {
      return nomeImagem ? this.productService.getUrlImagem(nomeImagem) : '';
    }

    adicionarAoCarrinho(card: Card) {
      const imagemUrl = this.getUrlImagem(card.nomeImagem);
      this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
      this.carrinhoService.adicionar({
        id: card.idProduct,
        nome: card.nome,
        preco: card.preco,
        quantidade: 1,
        imagemUrl: imagemUrl,
        category: card.category
      })

    }

    toggleDetails(card: Card) {
      card.showDetails = !card.showDetails;
    }

    showSnackbarTopPosition(content:any, action:any) {
      this.snackBar.open(content, action, {
        duration: 2000,
        verticalPosition: "top", // Allowed values are  'top' | 'bottom'
        horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      });
    }
}
