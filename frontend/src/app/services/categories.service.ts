import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategorySimplified } from '../models/category-simplified.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { InputCategory } from '../models/input-category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly apiURL = 'http://localhost:5209/api/categories';
  
  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategorySimplified[]>{
    return this.http.get<CategorySimplified[]>(this.apiURL);
  }

  getCategory(id: number): Observable<Category>{
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }

  addCategory(category: InputCategory): Observable<CategorySimplified>{
    return this.http.post<CategorySimplified>(this.apiURL, category);
  }

  editCategory(id:number, category: InputCategory): Observable<void>{
    return this.http.put<void>(`${this.apiURL}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
