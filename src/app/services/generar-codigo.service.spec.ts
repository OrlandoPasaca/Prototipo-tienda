import { TestBed } from '@angular/core/testing';

import { GenerarCodigoService } from './generar-codigo.service';

describe('GenerarCodigoService', () => {
  let service: GenerarCodigoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerarCodigoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
