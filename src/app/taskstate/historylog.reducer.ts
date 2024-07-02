import { History } from '../models/history.model'; // Adjust the path as needed
import {createReducer,on} from '@ngrx/store';
import * as HistoryActions from './task.action';

export interface HistoryLogState {
  historyLogs: History[];
  loading: boolean;
  error: string | null;
}

export const initialHistoryLogState: HistoryLogState = {
  historyLogs: [],
  loading: false,
  error: null
};

export const historyLogReducer = createReducer(
  initialHistoryLogState,
  on(HistoryActions.loadHistorylog, (state) => ({ ...state, loading: true })),
  on(HistoryActions.loadHistorylogSuccess, (state, { historyLogs }) => ({
    ...state,
    historyLogs,
    loading: false,
    error: null
  })),
  on(HistoryActions.loadHistorylogFailure, (state, { errorMessage }) => ({
    ...state,
    loading: false,
    error: errorMessage
  }))
);