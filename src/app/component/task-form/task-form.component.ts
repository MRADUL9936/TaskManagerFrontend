import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TaskState } from '../../taskstate/task.reducer';
import { addTask, updateTask } from '../../taskstate/task.action';
import { Task } from '../../models/task.model';
import { EdittaskService } from '../../services/edittask.service';

@Component({
  selector: 'task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  selectedTask: Task | null = null;

  constructor(
    private fb: FormBuilder,
    private store: Store<TaskState>,
    private taskEditService: EdittaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      priority_level: ['low', Validators.required],
      status: ['todo', Validators.required]
    });
  }

  ngOnInit() {
    this.taskEditService.selectedTask$.subscribe(task => {
      this.selectedTask = task;
      if (this.selectedTask) {
        // Format the date to yyyy-MM-dd
        const formattedTask = {
          ...this.selectedTask,
          due_date: new Date(this.selectedTask.due_date).toISOString().split('T')[0]
        };
        this.taskForm.patchValue(formattedTask);
      }
    });
  }


  submitForm() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.selectedTask) {
        const updatedTask = { ...this.selectedTask, ...task };
        console.log('Updated Task:', updatedTask);
        this.store.dispatch(updateTask({ task: updatedTask }));
        this.taskEditService.clearSelectedTask();
      } else {
        this.store.dispatch(addTask({ task }));
      }
      this.taskForm.reset();
    }
  }
}
