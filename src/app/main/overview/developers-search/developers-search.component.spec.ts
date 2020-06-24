import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopersSearchComponent } from './developers-search.component';

describe('DevelopersSearchComponent', () => {
  let component: DevelopersSearchComponent;
  let fixture: ComponentFixture<DevelopersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
