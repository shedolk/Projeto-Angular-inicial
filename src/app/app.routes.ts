import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';
import { usuarioResolver } from './components/usuario/resolver/usuario-resolver';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { enderecoResolver } from './components/endereco/resolver/endereco-resolver';
import { TelefoneListComponent } from './components/telefone/telefone-list/telefone-list.component';
import { TelefoneFormComponent } from './components/telefone/telefone-form/telefone-form.component';
import { telefoneResolver } from './components/telefone/resolver/telefone-resolver';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    title: 'Lista de Usuarios',
  },
  {
    path: 'usuarios/new',
    component: UsuarioFormComponent,
    title: 'Novo usuario',
  },
  {
    path: 'usuarios/edit/:id',
    component: UsuarioFormComponent,
    resolve: { usuario: usuarioResolver },
  },

  {
    path: 'enderecos',
    component: EnderecoListComponent,
    title: 'Lista de Enderecos',
  },
  {
    path: 'enderecos/usuario/:id',
    component: EnderecoListComponent,
    title: 'Lista de Enderecos',
  },
  {
    path: 'enderecos/new',
    component: EnderecoFormComponent,
    title: 'Novo endereco',
  },
  {
    path: 'enderecos/edit/:id',
    component: EnderecoFormComponent,
    resolve: { endereco: enderecoResolver },
  },

  {
    path: 'telefones',
    component: TelefoneListComponent,
    title: 'Lista de telefones',
  },
  {
    path: 'telefones/usuario/:id',
    component: TelefoneListComponent,
    title: 'Lista de telefones',
  },
  {
    path: 'telefones/new',
    component: TelefoneFormComponent,
    title: 'Novo Telefone',
  },
  {
    path: 'telefones/edit/:id',
    component: TelefoneFormComponent,
    resolve: { telefone: telefoneResolver },
  },
];
