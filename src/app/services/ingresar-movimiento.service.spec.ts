import { TestBed } from '@angular/core/testing';

import { IngresarMovimientoService } from './ingresar-movimiento.service';

describe('IngresarMovimientoService', () => {
  let service: IngresarMovimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresarMovimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
