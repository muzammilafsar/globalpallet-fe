import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingHelperComponent } from './routing-helper.component';

describe('RoutingHelperComponent', () => {
  let component: RoutingHelperComponent;
  let fixture: ComponentFixture<RoutingHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutingHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
