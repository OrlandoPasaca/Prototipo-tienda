import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaprodComponent } from './consultaprod.component';

describe('ConsultaprodComponent', () => {
  let component: ConsultaprodComponent;
  let fixture: ComponentFixture<ConsultaprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
