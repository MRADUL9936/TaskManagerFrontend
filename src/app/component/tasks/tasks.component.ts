import { Component, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import {Store} from '@ngrx/store';
import {TaskState} from '../../taskstate/task.reducer';
import {deleteTask} from '../../taskstate/task.action';
import { EdittaskService } from '../../services/edittask.service';

@Component({
  selector: 'task-item',
  templateUrl: './task.component.html',
  standalone:true,
  styleUrls: ['./task.component.css']

})
export class TaskItemComponent {
  @Input()
  task!: Task;

  constructor(private store: Store<TaskState>,private editaskService :EdittaskService,
   
  ) {}

  editTask() {
    // Implement edit task functionality here
      if(this.task.editable){
        this.editaskService.selectTask(this.task);
      
      }

  }

  deleteTask() {
    // Implement delete task functionality here
    this.store.dispatch(deleteTask({task: this.task}));
    console.log('Delete Task:', this.task);
  }

///function to format the date into yyyy-MM-dd
  formatDate(dateString: Date): string {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0];
  }
}
