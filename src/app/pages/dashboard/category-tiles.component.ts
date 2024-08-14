import { Component, OnInit } from '@angular/core';
import { CategoryService, CategoryDto } from '../../services/category.service';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-category-tiles',
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.css']
})
export class CategoryTilesComponent implements OnInit {
  categories: CategoryDto[] = [];
  

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories(moment().format('YYYY-MM'));
  }

  loadCategories(yearMonth: string): void {
    this.categoryService.getCategories(yearMonth).subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error loading categories', err)
    });
  }

  onMonthSelected(event: any): void {
    const chosenMonth = moment(event.value).format('YYYY-MM');
    this.loadCategories(chosenMonth);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<any>) {
    const ctrlValue = normalizedMonth;
    this.onMonthSelected({ value: ctrlValue });
    datepicker.close();
  }
}
