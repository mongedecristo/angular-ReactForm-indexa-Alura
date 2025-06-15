import { ListaContatosComponent } from './paginas/lista-contatos/lista-contatos.component';
import { FormularioContatoComponent } from './paginas/formulario-contato/formulario-contato.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'formulario',
    component: FormularioContatoComponent
  },
  {
    path: 'lista-contatos',
    component: ListaContatosComponent
  },
  {
    path: '',
    redirectTo: 'lista-contatos',
    pathMatch: 'full'
  }
];
