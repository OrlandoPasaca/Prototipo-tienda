import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroprodComponent } from './registroprod.component';

describe('RegistroprodComponent', () => {
  let component: RegistroprodComponent;
  let fixture: ComponentFixture<RegistroprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
