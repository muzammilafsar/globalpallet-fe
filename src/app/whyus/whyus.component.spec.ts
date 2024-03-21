import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyUSComponent } from './whyus.component';

describe('WhyUSComponent', () => {
  let component: WhyUSComponent;
  let fixture: ComponentFixture<WhyUSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyUSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyUSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
