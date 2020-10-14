import { TestBed } from '@angular/core/testing';

import { RegistroProdService } from './registro-prod.service';

describe('RegistroProdService', () => {
  let service: RegistroProdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroProdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
