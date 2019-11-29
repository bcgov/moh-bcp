import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PractAssignContainerComponent } from './pract-assign-container.component';

describe('PractAssignContainerComponent', () => {
  let component: PractAssignContainerComponent;
  let fixture: ComponentFixture<PractAssignContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PractAssignContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PractAssignContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
