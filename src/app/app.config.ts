import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';
import { provideHttpClient } from '@angular/common/http';
import { taskReducer } from './taskstate/task.reducer';
import { TaskEffect } from './taskstate/task.effect';
import { historyLogReducer } from './taskstate/historylog.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), provideStore(), 
     provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), 
     provideRouterStore(),
     provideState({name:'task',reducer:taskReducer}),
     provideState({name:'history',reducer:historyLogReducer}),
     provideEffects(TaskEffect),
      provideHttpClient(),
    
     
    ]
};
