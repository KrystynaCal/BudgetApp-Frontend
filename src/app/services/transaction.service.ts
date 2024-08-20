import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = '/api/categories'; // Base URL for the API

  constructor(private http: HttpClient) {}

  getCategoryDetails(categoryId: number, yearMonth?: string): Observable<CategoryDetailsDto> {
    let url = `${this.apiUrl}/${categoryId}`;
    if (yearMonth) {
      url += `?yearMonth=${yearMonth}`;
    }
    return this.http.get<CategoryDetailsDto>(url);
  }
}
