import { Pedido } from './pedido.models';
import { Product } from './product.models';
export class ItemPedido {
  id!: number;
  quantidade!: number;
  preco!: number;
  idProduct!: Product;
  idPedido!: Pedido;
}
