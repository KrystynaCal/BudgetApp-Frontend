import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
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
  private apiUrl = 'http://localhost:8080/categories'; 

  constructor(private http: HttpClient) {}

  getCategoryDetails(categoryId: number, yearMonth?: string): Observable<CategoryDetailsDto> {
    let params = new HttpParams();
    
    if (yearMonth) {
      params = params.set('yearMonth', yearMonth);
    }

    return this.http.get<CategoryDetailsDto>(`${this.apiUrl}/${categoryId}`, { params });
  }
}
