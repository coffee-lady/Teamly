import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsSearchComponent } from './projects-search.component';

describe('ProjectsSearchComponent', () => {
  let component: ProjectsSearchComponent;
  let fixture: ComponentFixture<ProjectsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
