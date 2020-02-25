import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiLineContainerComponent } from './multi-line-container.component';
import { CoreBCPModule } from '../../../core-bcp/core-bcp.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('MultiLineContainerComponent', () => {
  let component: MultiLineContainerComponent;
  let fixture: ComponentFixture<MultiLineContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CoreBCPModule, RouterTestingModule ],
      declarations: [ MultiLineContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
