import { TestBed } from '@angular/core/testing';

import { ConsultaprodCajaService } from './consultaprod-caja.service';

describe('ConsultaprodCajaService', () => {
  let service: ConsultaprodCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaprodCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
