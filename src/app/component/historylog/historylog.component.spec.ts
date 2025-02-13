import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorylogComponent } from './historylog.component';

describe('HistorylogComponent', () => {
  let component: HistorylogComponent;
  let fixture: ComponentFixture<HistorylogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorylogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
