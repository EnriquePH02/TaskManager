import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { InputTask } from '../models/input-task.model';
import { TaskSimplified } from '../models/task-simplified.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly apiURL = 'http://localhost:5209/api/categories';
  private readonly apiURL2 = 'tasks';

  constructor(private http: HttpClient) { }

  getTask(categoryId: number, id: number): Observable<Task>{
    return this.http.get<Task>(`${this.apiURL}/${categoryId}/${this.apiURL2}/${id}`);
  }

  addTask(categoryId: number, task: InputTask): Observable<TaskSimplified>{
    return this.http.post<TaskSimplified>(`${this.apiURL}/${categoryId}/${this.apiURL2}`, task);
  }

  editTask(categoryId: number, id: number, task: InputTask): Observable<void>{
    return this.http.put<void>(`${this.apiURL}/${categoryId}/${this.apiURL2}/${id}`, task);
  }

  deleteTask(categoryId: number, id:number): Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/${categoryId}/${this.apiURL2}/${id}`);
  }
}
