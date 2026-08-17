import { Routes } from '@angular/router';

import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { ProdutoFormularioComponent } from './produtos/produto-formulario/produto-formulario.component';

export const routes: Routes = [
  { path: '', redirectTo: '/produtos', pathMatch: 'full' },
  { path: 'produtos', component: ListaProdutosComponent },
  { path: 'produtos/novo', component: ProdutoFormularioComponent },
  { path: 'produtos/editar/:id', component: ProdutoFormularioComponent },
  { path: '**', redirectTo: '/produtos' },
];
