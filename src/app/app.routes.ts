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
import { PedidoListComponent } from './components/pedido/pedido-list/pedido-list.component';
import { PedidoFormComponent } from './components/pedido/pedido-form/pedido-form.component';
import { CupomListComponent } from './components/cupom/cupom-list/cupom-list.component';
import { CupomFormComponent } from './components/cupom/cupom-form/cupom-form.component';
import { ItemPedidoListComponent } from './components/itemPedido/itemPedido-list/itemPedido-list.component';
import { ItemPedidoFormComponent } from './components/itemPedido/itemPedido-form/itemPedido-form.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductFormComponent } from './components/product/product-form/product-form.component';
import { cupomResolver } from './components/cupom/resolver/cupom-resolver';
import { itempedidoResolver } from './components/itemPedido/resolver/itemPedido-resolver';
import { productResolver } from './components/product/resolver/product-resolver';
import { pedidoResolver } from './components/pedido/resolver/pedido-resolver';

export const routes: Routes = [
  // Rota usuarios
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

  // Rota enderecos
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

  // Rota telefones
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
  // Rota pedidos
  {
    path: 'pedidos',
    component: PedidoListComponent,
    title: 'Lista de Pedidos',
  },
  {
    path: 'pedidos/new',
    component: PedidoFormComponent,
    title: 'Novo Pedido',
  },
  {
    path: 'pedidos/edit/:id',
    component: PedidoFormComponent,
    title: 'Editar Pedido',
    resolve: { pedido: pedidoResolver },
  },
  // Rota cupom
  {
    path: 'cupom',
    component: CupomListComponent,
    title: 'Lista de Cupons',
  },
  {
    path: 'cupom/new',
    component: CupomFormComponent,
    title: 'Novo Cupom',
  },
  {
    path: 'cupom/edit/:id',
    component: CupomFormComponent,
    title: 'Editar Cupom',
    resolve: { cupom: cupomResolver },
  },
  // rota ItemPedido
  {
    path: 'itenspedidos',
    component: ItemPedidoListComponent,
    title: 'Lista de Itens do Pedido',
  },
  {
    path: 'itenspedidos/new',
    component: ItemPedidoFormComponent,
    title: 'Novo Item do Pedido',
  },
  {
    path: 'itenspedidos/edit/:id',
    component: ItemPedidoFormComponent,
    title: 'Editar Item do Pedido',
    resolve: { itemPedido: itempedidoResolver },
  },

  // Rota Produtos
  {
    path: 'produtos',
    component: ProductListComponent,
    title: 'Lista de Produtos',
  },
  {
    path: 'produtos/new',
    component: ProductFormComponent,
    title: 'Novo Produto',
  },
  {
    path: 'produtos/edit/:id',
    component: ProductFormComponent,
    title: 'Editar Produto',
    resolve: { product: productResolver },
  },
];
