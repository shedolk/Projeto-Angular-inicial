import { Cupom } from './cupom.models';
import { ItemPedido } from './itemPedido.models';
import { Pagamento } from './pagamento.models';
import { StatusPedido } from './statusPedido.models';
import { Usuario } from './usuario.model';

export class Pedido {
  id!: number;
  dataPedido!: Date;
  pagamento!: Pagamento;
  statusPedido!: StatusPedido;
  cupom!: Cupom;
  totalPedido!: number;
  usuario!: Usuario;
  itemPedido!: ItemPedido[];
}
