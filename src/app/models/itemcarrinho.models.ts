import { Category } from "./category.models";

export class ItemCarrinho {
  id!: number;
  nome!: string;
  quantidade!: number;
  preco!: number;
  imagemUrl!: string;
  category!: Category; // Adicionando a categoria
}
