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

export interface TransactionCreateDto {
  amount: number;
  name: string;
  date: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private categoryApiUrl = 'http://localhost:8080/categories';
  private transactionApiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}


  getCategoryDetails(categoryId: number, yearMonth?: string): Observable<CategoryDetailsDto> {
    let params = new HttpParams();
    
    if (yearMonth) {
      params = params.set('yearMonth', yearMonth);
    }

    return this.http.get<CategoryDetailsDto>(`${this.categoryApiUrl}/${categoryId}`, { params });
  }


  saveTransaction(transactionCreateDto: TransactionCreateDto, categoryId: number): Observable<TransactionDto> {
    const params = new HttpParams().set('categoryId', categoryId.toString());
    return this.http.post<TransactionDto>(this.transactionApiUrl, transactionCreateDto, { params });
  }

  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.transactionApiUrl}/${transactionId}`);
  }
  
}
