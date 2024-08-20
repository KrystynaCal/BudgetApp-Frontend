import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/transaction.service';

interface TransactionDto {
  id: number;
  amount: number;
  name: string;
  date: string;
  description: string;
  categoryId: number;
  categoryName: string;
}

interface CategoryDto {
  id: number;
  name: string;
  categoryType: string;
  totalAmount: number;
  createdAt: string;
}

interface CategoryDetailsDto {
  category: CategoryDto;
  transactions: TransactionDto[];
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {
  category: CategoryDto = {
    id: 0,
    name: '',
    categoryType: '',
    totalAmount: 0,
    createdAt: ''
  };
  transactions: TransactionDto[] = [];
  selectedMonth: string = '';  


  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.route.queryParams.subscribe(params => {
      this.selectedMonth = params['month'] || '';
      this.loadTransactions(categoryId, this.selectedMonth);
    });
  }

  loadTransactions(categoryId: string | null, month: string): void {
    if (categoryId) {
      this.transactionService.getCategoryDetails(Number(categoryId), month).subscribe({
        next: (data) => {
          this.category = data.category;
          this.transactions = data.transactions;
        },
        error: (err) => console.error('Error loading transactions', err),
      });
    }
  }
}
