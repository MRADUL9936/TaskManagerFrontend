import { Injectable, inject } from '@angular/core';
import { TaskApiService } from '../services/task.service'; // Updated to TaskApiService
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TaskActions from './task.action'; // Updated to TaskActions
import { catchError, map, of, switchMap, tap } from 'rxjs';
import * as HistoryActions from './task.action'; // Updated to HistoryActions

@Injectable()
export class TaskEffect {
  private api = inject(TaskApiService); // Updated to TaskApiService
  private action$ = inject(Actions);

  loadTasks$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskActions.loadTasks), // Updated to loadTasks
      switchMap(() =>
        this.api.getTasks().pipe(
          map((res) => TaskActions.loadTasksSuccess({ tasks: res })), // Updated to loadTasksSuccess and tasks
          catchError((error: { message: string }) =>
            of(
              TaskActions.loadTasksFailure({
                errorMessage: 'Fail to load tasks', // Updated error message
              })
            )
          )
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskActions.addTask), // Updated to addTask
      switchMap((action) =>
  
        this.api.addTask(action.task).pipe(
          map((res) => TaskActions.addTaskSuccess({ task:res})), // Updated to addTaskSuccess and task
          catchError((error: { message: string }) =>
            of(
              TaskActions.addTaskFailure({
                errorMessage: 'Fail to add task', // Updated error message
              })
            )
          )
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskActions.updateTask), // Updated to updateTask
      switchMap((action) =>
        this.api.updateTask(action.task).pipe(
          map((res) => TaskActions.updateTaskSuccess({ task: res })), // Updated to updateTaskSuccess and task
          catchError((error: { message: string }) =>
            of(
              TaskActions.updateTaskFailure({
                errorMessage: 'Fail to update task', // Updated error message
              })
            )
          )
        )
      )
    )
  );


  deleteTask$ = createEffect(() =>
    this.action$.pipe(
      ofType(TaskActions.deleteTask), // Updated to deleteTask
      switchMap((action) =>
        this.api.deleteTask(action.task).pipe(
          map((res) => TaskActions.deleteTaskSuccess({ task: res })), // Updated to deleteTaskSuccess and task
          catchError((error: { message: string }) =>
            of(
              TaskActions.deleteTaskFailure({
                errorMessage: 'Fail to delete task', // Updated error message
              })
            )
          )
        )
      )
    )
  );


  loadHistorylog$ = createEffect(() =>
    this.action$.pipe(
      ofType(HistoryActions.loadHistorylog),
      switchMap(() =>
        this.api.getHistorylog().pipe(
         
          map(historyLogs => HistoryActions.loadHistorylogSuccess({ historyLogs })),
          catchError(error =>
            of(HistoryActions.loadHistorylogFailure({ errorMessage: 'Failed to load history log' }))
          )
        )
      )
    )
  );

}
