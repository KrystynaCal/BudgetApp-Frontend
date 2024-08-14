import { Routes } from '@angular/router';
import { CategoryTilesComponent } from './dashboard/category-tiles.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: CategoryTilesComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
