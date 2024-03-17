import { Usuario } from './usuario.model';

export class Telefone {
  id!: number;
  codigoArea!: string;
  numero!: number;
  usuario!: Usuario;
}
