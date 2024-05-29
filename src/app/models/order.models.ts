import { ItemCarrinho } from "./itemcarrinho.models";
import { Usuario } from "./usuario.model";

export interface Order {
  id: number;
  dataHora: string;  // Utilize string para datas
  usuario: Usuario;
  totalPedido: number;
  itens: ItemCarrinho[];
}
