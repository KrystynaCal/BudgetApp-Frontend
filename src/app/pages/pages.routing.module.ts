import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryTilesComponent } from './dashboard/category-tiles.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryTilesComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: ':categoryId/transactions',
    loadChildren: () =>
      import('./transactions/transactions.module').then(m => m.TransactionsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
