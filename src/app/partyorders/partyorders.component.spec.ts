import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyordersComponent } from './partyorders.component';

describe('PartyordersComponent', () => {
  let component: PartyordersComponent;
  let fixture: ComponentFixture<PartyordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
