import { TestBed } from '@angular/core/testing';

import { GetScreenDetailService } from './get-screen-detail.service';

describe('GetScreenDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetScreenDetailService = TestBed.get(GetScreenDetailService);
    expect(service).toBeTruthy();
  });
});
