import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignInputComponent } from './assign-input.component';

describe('AssignInputComponent', () => {
  let component: AssignInputComponent;
  let fixture: ComponentFixture<AssignInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
