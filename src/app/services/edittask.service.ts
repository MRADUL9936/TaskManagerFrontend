import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EdittaskService {
  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  selectedTask$ = this.selectedTaskSubject.asObservable();

  selectTask(task: Task) {
    this.selectedTaskSubject.next(task);
  }

  clearSelectedTask() {
    this.selectedTaskSubject.next(null);
  }
}
