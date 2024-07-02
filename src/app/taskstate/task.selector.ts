import {  createFeatureSelector, createSelector, select } from "@ngrx/store";
import { TaskState } from "./task.reducer";
import { HistoryLogState } from "./historylog.reducer";

export const selectTaskFeature=createFeatureSelector<TaskState>('task');    

export const selectAllTasks=createSelector(
    selectTaskFeature,
    (state:TaskState)=>state.tasks
);

export const selectTaskError=createSelector(
    selectTaskFeature,
    (state:TaskState)=>state.errorMessage
);

// Feature selector for history logs
export const selectHistoryFeature = createFeatureSelector<HistoryLogState>('history');

// Selector to get all history logs
export const selectHistoryLogs = createSelector(
  selectHistoryFeature,
  (state: HistoryLogState) => state.historyLogs==null?[]:state.historyLogs
);


// Selector to get history error messages
export const selectHistoryError = createSelector(
  selectHistoryFeature,
  (state: HistoryLogState) => state.error
);
