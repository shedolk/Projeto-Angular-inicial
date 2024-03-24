import { FormaPagamento } from './formaPagamento.models';

export class Pagamento {
  id!: number;
  momento!: Date;
  formaPagamento!: FormaPagamento;
}
