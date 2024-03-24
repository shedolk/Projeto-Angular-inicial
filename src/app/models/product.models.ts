import { Category } from './category.models';

export class Product {
  id!: number;
  nome!: string;
  descricao!: string;
  category!: Category;
  preco!: number;
  estoque!: number;
  nomeImagem!: string;
}
