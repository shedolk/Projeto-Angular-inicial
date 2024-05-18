import { dadosTecnicosResolver } from './components/dadostecnicos/resolver/dadostecnicos-resolver';
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
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { CategoryFormComponent } from './components/category/category-form/category-form.component';
import { categoryResolver } from './components/category/resolver/category-resolver';
import { DadostecnicosListComponent } from './components/dadostecnicos/dadostecnicos-list/dadostecnicos-list.component';
import { DadostecnicosFormComponent } from './components/dadostecnicos/dadostecnicos-form/dadostecnicos-form.component';
import { LoginComponent } from './components/login/login.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { ProductCardListComponent } from './components/products-card-list/products-card-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';

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
    path: 'enderecos/usuario/:idUsuario/new',
    component: EnderecoFormComponent,
    title: 'Novo endereco',
  },
  {
    path: 'enderecos/edit/:id',
    component: EnderecoFormComponent,
    resolve: { endereco: enderecoResolver },
  },
  {
    path: 'enderecos/usuario/:idUsuario/edit/:id',
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
    path: 'telefones/usuario/:idUsuario/new',
    component: TelefoneFormComponent,
    title: 'Novo Telefone',
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

  {
    path: 'telefones/usuario/:idUsuario/edit/:id',
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
    resolve: { itempedido: itempedidoResolver },
  },

  // Rota Produtos
  // {
  //   path: 'produtos',
  //   component: ProductListComponent,
  //   title: 'Lista de Produtos',
  // },
  // {
  //   path: 'produtos/new',
  //   component: ProductFormComponent,
  //   title: 'Novo Produto',
  // },
  // {
  //   path: 'produtos/edit/:id',
  //   component: ProductFormComponent,
  //   title: 'Editar Produto',
  //   resolve: { product: productResolver },
  // },

  {
    path: '',
    component: UserTemplateComponent,
    title: 'e-commerce',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'produtos' },

      { path: 'produtos', component: ProductCardListComponent, title: 'Produtos à Venda' },
      //{ path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos' },
      {path: 'usuarios/new', component: UsuarioFormComponent, title: 'Novo usuario',}
    ]

  },

  {
    path: 'admin',
    component: AdminTemplateComponent,
    title: 'e-commerce',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categories' },

      { path: 'categories', component: CategoryListComponent, title: 'Lista de Suspensoes', },
      { path: 'categories/new', component: CategoryFormComponent, title: 'Nova Suspensao', },
      { path: 'categories/edit/:id', component: CategoryFormComponent, title: 'Editar Suspensao', resolve: { category: categoryResolver } },

      { path: 'produtos', component: ProductListComponent, title: 'Lista de Produtos', },
      { path: 'produtos/new', component: ProductFormComponent, title: 'Novo Produto', },
      { path: 'produtos/edit/:id', component: ProductFormComponent, title: 'Editar Produto', resolve: { product: productResolver } },
    ]
  },


  { path: 'login', component: LoginComponent, title: 'Login' },

  // Rota categories
  // {
  //   path: 'categories',
  //   component: CategoryListComponent,
  //   title: 'Lista de Suspensoes',
  // },
  // {
  //   path: 'categories/new',
  //   component: CategoryFormComponent,
  //   title: 'Nova Suspensao',
  // },
  // {
  //   path: 'categories/edit/:id',
  //   component: CategoryFormComponent,
  //   title: 'Editar Suspensao',
  //   resolve: { category: categoryResolver },
  // },

  // {
  //   path: 'dadostecnicos',
  //   component: DadostecnicosListComponent,
  //   title: 'Lista de Dados Tecnicos',
  // },
  // {
  //   path: 'dadostecnicoss/edit/:id',
  //   component: DadostecnicosFormComponent,
  //   title: 'Cadastrar Dados Tecnicos da Peças',
  //   resolve: { dadosTecnicos: dadosTecnicosResolver },
  // },
  // {
  //   path: 'dadostecnicos/new',
  //   component: DadostecnicosFormComponent,
  //   title: 'Novos dados tecnicos',
  // },
];
