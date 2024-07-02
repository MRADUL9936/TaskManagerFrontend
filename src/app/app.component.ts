import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskState } from './taskstate/task.reducer';
import { loadTasks, sortTask } from './taskstate/task.action';
import { selectAllTasks, selectTaskError,selectHistoryError,selectHistoryLogs } from './taskstate/task.selector';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './component/tasks/tasks.component';
import { TaskFormComponent } from './component/task-form/task-form.component';
import {saveAs} from 'file-saver';
import {HistorylogComponent} from './component/historylog/historylog.component';
import { loadHistorylog } from './taskstate/task.action';
import { History } from './models/history.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule,TaskItemComponent,TaskFormComponent,HistorylogComponent]  // Add CommonModule here
})
export class AppComponent implements OnInit {
  tasks$: Observable<Task[]>;
  errorMessage$: Observable<string | null>;
  history$:Observable<History[]>
  errorHistory$:Observable<string |null>;

  constructor(private store: Store<TaskState>) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.errorMessage$ = this.store.select(selectTaskError);
    this.history$=this.store.select(selectHistoryLogs)
    this.errorHistory$=this.store.select(selectHistoryError)
  }

  ngOnInit() {
    this.store.dispatch(loadTasks());
  
  }

  applySort(sortBy: string){
    console.log(sortBy)
    this.store.dispatch(sortTask({priority:sortBy}));
  }

  generateCSV() {
    console.log('Generating CSV');
    this.tasks$.subscribe(tasks => {
      const headers = ['ID', 'Title', 'Description', 'Priority Level', 'Due Date', 'Status'];
      const rows = tasks.map(task => [
        task._id,
        task.title,
        task.description,
        task.priority_level,
        this.formatDate(task.due_date),
        task.status
      ]);

      let csvContent = '';
      csvContent += headers.join(',') + '\r\n';
      rows.forEach(row => {
        csvContent += row.join(',') + '\r\n';
      });

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, 'tasks.csv');
    });
  }

  formatDate(dateString: Date): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }


  logHistory() {
    
   this.store.dispatch(loadHistorylog());
  }
}
