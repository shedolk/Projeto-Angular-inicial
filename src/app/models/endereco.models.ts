import { Usuario } from './usuario.model';

export class Endereco {
  id!: number;
  rua!: string;
  numero!: string;
  cidade!: string;
  estado!: string;
  cep!: string;
  usuario!: Usuario;
}
