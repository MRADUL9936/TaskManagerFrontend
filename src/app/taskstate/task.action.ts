import { createAction,props } from "@ngrx/store";
import {Task} from '../models/task.model';
import { History } from "../models/history.model";

// loadTasks
export const loadTasks = createAction(
  '[Task] Load Task'
);
export const loadTasksSuccess=createAction(
    '[Task] Load Task Success',
    props<{ tasks: Task[] }>()
    );

export const loadTasksFailure=createAction(
    '[Task] Load Task Failure',
    props<{ errorMessage: any }>()
    );


//addTask

export const addTask=createAction(
    '[Task] Add Task',
    props<{ task: Task }>()
  
    );

export const addTaskSuccess=createAction(
    '[Task] Add Task Success',
    props<{ task: Task }>()
    );

export const addTaskFailure=createAction(
    '[Task] Add Task Failure',
    props<{ errorMessage: any }>()
    );


//updateTask
export const updateTask=createAction(
    '[Task] Update Task',
    props<{ task: Task }>()
    );

export const updateTaskSuccess=createAction(
    '[Task] Update Task Success',
    props<{ task: Task }>()
    );

export const updateTaskFailure=createAction(  
    '[Task] Update Task Failure',
    props<{ errorMessage: any }>()
    );


//deleteTask
export const deleteTask=createAction(
    '[Task] Delete Task',
    props<{ task: Task }>()
    );

export const deleteTaskSuccess=createAction(
    '[Task] Delete Task Success',
    props<{ task: Task }>()
    );

export const deleteTaskFailure=createAction(
    '[Task] Delete Task Failure',
    props<{ errorMessage: any }>()
);


//sortTask

export const sortTask=createAction(
    '[Task] Sort Task',
   props<{ priority:string }>()
    );
export const sortTaskSuccess=createAction(
    '[Task] Sort Task Success',
    props<{ tasks: Task[] }>()
    );
export const sortTaskFailure=createAction(
    '[Task] Sort Task Failure',
    props<{ errorMessage: any }>()
    );



    // historylog
export const loadHistorylog=createAction(
    '[History] Load Historylog'
    );

export const loadHistorylogSuccess=createAction(
    '[History] Load Historylog Success',
    props<{ historyLogs: History[] }>()
    );

export const loadHistorylogFailure=createAction(
    '[History] Load Historylog Failure',
    props<{ errorMessage: any }>()
    );