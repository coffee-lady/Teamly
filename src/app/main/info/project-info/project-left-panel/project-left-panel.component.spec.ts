import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLeftPanelComponent } from './project-left-panel.component';

describe('ProjectLeftPanelComponent', () => {
  let component: ProjectLeftPanelComponent;
  let fixture: ComponentFixture<ProjectLeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLeftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
