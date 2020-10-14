import { TestBed } from '@angular/core/testing';

import { ConsultaprodService } from './consultaprod.service';

describe('ConsultaprodService', () => {
  let service: ConsultaprodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaprodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
