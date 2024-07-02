import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './tasks.component';
describe('TasksComponent', () => {
  let component: TaskItemComponent ;
  let fixture: ComponentFixture<TaskItemComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});