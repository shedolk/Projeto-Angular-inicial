import { Category } from "./category.models";
import { Product } from "./product.models";

export class ItemCarrinho {
  id!: number;
  nome!: string;
  quantidade!: number;
  preco!: number;
  imagemUrl!: string;
  //product!: Product;
  category!: Category;

}
