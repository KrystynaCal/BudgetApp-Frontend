import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService, CategoryDto } from '../../services/category.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ChangeDetectorRef } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-category-tiles',
  templateUrl: './category-tiles.component.html',
  styleUrls: ['./category-tiles.component.css']
})
export class CategoryTilesComponent implements OnInit {
  categories: CategoryDto[] = [];
  defaultMonth: moment.Moment = moment(); // Initialize with current month
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadCategories(this.defaultMonth.format('YYYY-MM'));
  }

  // Zmienne do wykresu
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Wydatki', 'Wpływy', 'Zaoszczędzone'],
    datasets: [
      {
        label: 'Kwoty',
        data: [0, 0, 0], // Początkowo puste dane, które będą zaktualizowane po załadowaniu z backendu
        backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(75, 192, 192, 0.5)']
      }
    ]
  };

  updateChartData(categories: CategoryDto[]): void {
    const totalExpense = categories.reduce((sum, category) => category.categoryType === 'EXPENSE' ? sum + category.totalAmount : sum, 0);
    const totalIncome = categories.reduce((sum, category) => category.categoryType === 'INCOME' ? sum + category.totalAmount : sum, 0);
    const totalSaved = totalIncome - totalExpense;
    this.barChartData.datasets[0].data = [totalExpense, totalIncome, totalSaved];
    this.cd.detectChanges();
    if (this.chart) {
      this.chart.chart?.update();
    }
  }

  loadCategories(yearMonth: string): void {
    this.categoryService.getCategories(yearMonth).subscribe({
      next: (data) => {
        this.categories = data;
        this.updateChartData(this.categories);
      },
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

  deleteCategory(categoryId: number): void {
    if (confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          this.categories = this.categories.filter(category => category.id !== categoryId);
          alert('Kategoria została usunięta.');
        },
        error: (err) => console.error('Błąd podczas usuwania kategorii', err)
      });
    }
  }
}
