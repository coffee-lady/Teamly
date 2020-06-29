import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskLeftPanelComponent } from './task-left-panel.component';

describe('TaskLeftPanelComponent', () => {
  let component: TaskLeftPanelComponent;
  let fixture: ComponentFixture<TaskLeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskLeftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
