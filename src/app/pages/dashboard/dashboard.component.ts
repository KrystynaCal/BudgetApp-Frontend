import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TransactionService, TransactionDto } from '../../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'categoryName', 'amount', 'date'];
  dataSource: TransactionDto[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (transactions) => {
        this.dataSource = transactions;
      },
      error: (error) => {
        console.error('Error loading transactions', error);
      }
    });
  }
}
