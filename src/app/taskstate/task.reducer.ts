import { createReducer, on } from '@ngrx/store';
import {Task} from '../models/task.model';
import * as TaskActions from './task.action';

export interface TaskState{
    tasks: Task[];
    Loading:boolean;
    errorMessage: string|null;
}

export const initialTaskState: TaskState={
 tasks:[],
 Loading:false,
    errorMessage:null
}

export const taskReducer= createReducer(
    initialTaskState,
    on(TaskActions.loadTasksSuccess,(state,{tasks})=>({
        ...state,
        tasks,
        Loading:false,
        errorMessage:null
    })),
    on(TaskActions.loadTasks,(state)=>({
        ...state,
        Loading:true,
        errorMessage:null
    })),
    on (TaskActions.loadTasksFailure,(state,{errorMessage})=>({
        ...state,
        errorMessage
    })
    ),
// addtask
on(TaskActions.addTaskSuccess, (state, { task }) => {
    console.log('Task added successfully:', task); // Log the task here
    return {
      ...state,
      tasks: [...state.tasks, task],
      errorMessage: null
    };
  }),
    on(TaskActions.addTaskFailure,(state,{errorMessage})=>({
        ...state,
        errorMessage
    })
    ),
// updateTask
on(TaskActions.updateTaskSuccess, (state, { task }) => {
    console.log('Updated Task:', task);
    return {
      ...state,
      tasks: state.tasks.map(t => t._id === task._id ? task : t),
      errorMessage: null
    }}),

    on(TaskActions.updateTaskFailure,(state,{errorMessage})=>({
        ...state,
        errorMessage
    })),

// deletetask
  on(TaskActions.deleteTask,(state,{task})=>({
    ...state,
    tasks:state.tasks.filter(t=>t._id!==task._id),
    errorMessage:null
  })),
    on(TaskActions.deleteTaskFailure,(state,{errorMessage})=>({
        ...state,
        errorMessage
    })),

// Sort task by priority_level, due_date, or status
on(TaskActions.sortTask, (state, { priority }: { priority: string }) => {
    let sortedTasks = [...state.tasks];
       console.log("inside priority",priority)
    sortedTasks.sort((a, b) => {
      if (priority==='priority_level') {
        console.log("inside priority")
        const priorityA = (a.priority_level as string).toLowerCase();
        const priorityB = (b.priority_level as string).toLowerCase();
        return comparePriority(priorityA, priorityB);
      } else if (priority === 'due_date') {
        return compareDueDate(a.due_date, b.due_date);
      } else if (priority === 'status') {
        const statusa=(a.status as string).toLowerCase();
        const statusb=(b.status as string).toLowerCase();
        return compareStatus(statusa,statusb);
      }

      return 0; // Default: no change in order
    });

    return {
      ...state,
      tasks: sortedTasks,
      errorMessage: null
    };
  }),

  // Sort Task success action
  on(TaskActions.sortTaskSuccess, (state, { tasks }) => ({
    ...state,
    tasks: [...tasks], // Ensure to create a new array for tasks
    errorMessage: null
  })),

  // Sort Task failure action
  on(TaskActions.sortTaskFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage
  }))
)





function comparePriority(priorityA: string, priorityB: string): number {
    const priorityOrder: { [key: string]: number } = {
        'high': 3,
        'medium': 2,
        'low': 1
      };
    
      const orderA = priorityOrder[priorityA.toLowerCase()];
      const orderB = priorityOrder[priorityB.toLowerCase()];
    
      return orderB - orderA;
  }
  
  function compareDueDate(dueDateA: Date, dueDateB: Date): number {
    const dateA = new Date(dueDateA).getTime();
    const dateB = new Date(dueDateB).getTime();
    return dateB - dateA;
  }
  
  function compareStatus(statusA: string, statusB: string): number {
    const statusOrder: { [key: string]: number } = {
        'completed': 3,
        'in-progress': 2,
        'todo': 1
      };
    
      const orderA = statusOrder[statusA.toLowerCase()];
      const orderB = statusOrder[statusB.toLowerCase()];
    
      return orderB - orderA;
  }