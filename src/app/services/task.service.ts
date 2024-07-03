import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import {History} from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private http = inject(HttpClient);
  private apiUrl = 'https://mytaskmanagerbackend.onrender.com/tasks'; // Replace with the actual task API endpoint

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.http.get<{tasks:Task[]}>(this.apiUrl)
      .pipe(
        map(response => response.tasks), 
      );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<{ task: Task }>(`${this.apiUrl}/add`, task)
    .pipe(
      map(response => response.task),
   
    );
       // Update to response.task

  }

  updateTask(task: Task): Observable<Task> {

    return this.http.put<{updatedTask:Task}>(`${this.apiUrl}/update`, task)
    .pipe(
      map(response => response.updatedTask),
    );
  }
  deleteTask(task:Task):Observable<Task>{
    return this.http.delete<Task>(`${this.apiUrl}/delete/${task._id}`);
  }
  

  getHistorylog(): Observable<History[]> {
    return this.http.get<{history:History[]}>(`${this.apiUrl}/gethistorylog`)
      .pipe(
        map(response => response.history),
      );
  }
  
}
