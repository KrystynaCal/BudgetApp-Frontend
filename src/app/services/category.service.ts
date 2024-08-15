import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryDto {
  id: number;
  name: string;
  categoryType: string; 
  totalAmount: number;
  createdAt: string; 
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) {}

  getCategories(yearMonth: string): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${this.baseUrl}/categories?yearMonth=${yearMonth}`);
  }

  addCategory(category: CategoryDto): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(`${this.baseUrl}/categories`, category);
  }
  
}
