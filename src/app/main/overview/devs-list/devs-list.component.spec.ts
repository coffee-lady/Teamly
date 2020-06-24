import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevsListComponent } from './devs-list.component';

describe('DevsListComponent', () => {
  let component: DevsListComponent;
  let fixture: ComponentFixture<DevsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
