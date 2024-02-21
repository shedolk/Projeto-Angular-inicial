import { Routes } from '@angular/router';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './components/usuario/usuario-form/usuario-form.component';

export const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuarioListComponent,
    title: 'Lista de Usuarios',
  },
  {
    path: 'usuarios/new',
    component: UsuarioFormComponent,
    title: 'Lista de Usuarios',
  },
];
