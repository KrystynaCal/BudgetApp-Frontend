import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule  } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CategoryTilesComponent } from './dashboard/category-tiles.component';
import { AddCategoryComponent } from './add-category/add-category.component';




@NgModule({
  declarations: [CategoryTilesComponent, AddCategoryComponent],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    HttpClientModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule, 
    MatOptionModule, 
    PagesRoutingModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
})
export class PagesModule {}
