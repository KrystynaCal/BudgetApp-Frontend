import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryDto } from '../../services/category.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-tiles',
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.css']
})
export class CategoryTilesComponent implements OnInit {
  categories: CategoryDto[] = [];
  defaultMonth: moment.Moment = moment(); // Initialize with current month

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategories(this.defaultMonth.format('YYYY-MM'));
  }

  loadCategories(yearMonth: string): void {
    this.categoryService.getCategories(yearMonth).subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories', err)
    });
  }

  onMonthSelected(event: any): void {
    const chosenMonth = moment(event.value).format('YYYY-MM');
    this.defaultMonth = moment(event.value); // Update defaultMonth
    this.loadCategories(chosenMonth);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<any>) {
    const ctrlValue = normalizedMonth;
    this.onMonthSelected({ value: ctrlValue });
    datepicker.close();
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory(result);
      }
    });
  }

  addCategory(category: CategoryDto): void {
    this.categoryService.addCategory(category).subscribe({
      next: () => this.loadCategories(this.defaultMonth.format('YYYY-MM')),
      error: (err) => console.error('Error adding category', err)
    });
  }
}
