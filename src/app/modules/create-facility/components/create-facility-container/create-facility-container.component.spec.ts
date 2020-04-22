import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedCoreModule } from 'moh-common-lib';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CreateFacilityContainerComponent } from './create-facility-container.component';

describe('CreateFacilityContainerComponent', () => {
  let component: CreateFacilityContainerComponent;
  let fixture: ComponentFixture<CreateFacilityContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, SharedCoreModule ],
      declarations: [ CreateFacilityContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFacilityContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
