import { TestBed } from '@angular/core/testing';

import { IngresarStockService } from './ingresar-stock.service';

describe('IngresarStockService', () => {
  let service: IngresarStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresarStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
