import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcassionaloffComponent } from './ocassionaloff.component';

describe('OcassionaloffComponent', () => {
  let component: OcassionaloffComponent;
  let fixture: ComponentFixture<OcassionaloffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcassionaloffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcassionaloffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
