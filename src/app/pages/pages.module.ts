import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { CategoryTilesComponent } from './dashboard/category-tiles.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';




@NgModule({
  declarations: [CategoryTilesComponent],
  imports: [
    MatMomentDateModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    MatCardModule, // Dodaj ten import
    MatTableModule,
    RouterModule.forChild(PagesRoutes),
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
