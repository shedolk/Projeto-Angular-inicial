import { Endereco } from './endereco.models';
import { Perfil } from './perfil.models';
import { Telefone } from './telefone.models';

export class Usuario {
  id!: number;
  nome!: string;
  login!: string;
  senha!: string;
  perfil!: Perfil;
  listaTelefone!: Telefone[];
  listaEndereco!: Endereco[];
}
