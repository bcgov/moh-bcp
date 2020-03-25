import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityContainerComponent } from './facility-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FacilityContainerComponent', () => {
  let component: FacilityContainerComponent;
  let fixture: ComponentFixture<FacilityContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, SharedCoreModule, HttpClientTestingModule ],
      declarations: [ FacilityContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
